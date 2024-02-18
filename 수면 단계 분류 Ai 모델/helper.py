import os
import logging
import itertools
import torch
import torch.nn as nn
import numpy as np
import matplotlib.pyplot as plt
from torch.utils.data import DataLoader, Dataset
from tqdm import tqdm
from PIL import Image
from torchvision import models


def get_logger(log_path, name):
    logger = logging.getLogger(name)
    logger.setLevel(logging.INFO) 

    streamHandler = logging.StreamHandler()
    streamHandler.setLevel(logging.WARNING)
    logger.addHandler(streamHandler)
    
    fileHandler = logging.FileHandler(log_path)
    fileHandler.setLevel(logging.DEBUG)
    logger.addHandler(fileHandler)

    return logger


class EarlyStopping:
    def __init__(self, patience=7, verbose=False, delta=0, path='model.pth', trace_func=print):
        self.patience = patience
        self.verbose = verbose
        self.counter = 0
        self.best_score = None
        self.early_stop = False
        self.val_loss_min = np.Inf
        self.delta = delta
        self.path = path
        self.trace_func = trace_func
        
    def __call__(self, val_loss, model):
        score = -val_loss

        if self.best_score is None:
            self.best_score = score
            self.save_checkpoint(val_loss, model)
        elif score < self.best_score + self.delta:
            self.counter += 1
            self.trace_func(f'EarlyStopping counter: {self.counter} out of {self.patience}')
            if self.counter >= self.patience:
                self.early_stop = True
        else:
            self.best_score = score
            self.save_checkpoint(val_loss, model)
            self.counter = 0

    def save_checkpoint(self, val_loss, model):
        '''Saves model when validation loss decrease.'''
        if self.verbose:
            self.trace_func(f'Validation loss decreased ({self.val_loss_min:.6f} --> {val_loss:.6f}).  Saving model ...')
        torch.save(model.state_dict(), self.path)
        self.val_loss_min = val_loss


def plot_confusion_matrix(cm, classes,
                          normalize=False,
                          title='Confusion matrix',
                          cmap=plt.cm.Blues,
                          save_path=None):
    """
    This function prints and plots the confusion matrix.
    Normalization can be applied by setting `normalize=True`.
    """
    if normalize:
        cm = cm.astype('float') / cm.sum(axis=1)[:, np.newaxis]
        print("Normalized confusion matrix")
    else:
        print('Confusion matrix, without normalization')

    plt.imshow(cm, interpolation='nearest', cmap=cmap)
    plt.title(title)
    plt.colorbar()
    tick_marks = np.arange(len(classes))
    plt.xticks(tick_marks, classes, rotation=45)
    plt.yticks(tick_marks, classes)

    fmt = '.2f' if normalize else 'd'
    thresh = cm.max() / 2.
    for i, j in itertools.product(range(cm.shape[0]), range(cm.shape[1])):
        plt.text(j, i, format(cm[i, j], fmt),
                 horizontalalignment="center",
                 color="white" if cm[i, j] > thresh else "black")

    plt.tight_layout()
    plt.ylabel('True label')
    plt.xlabel('Predicted label')
    
    if save_path is not None:
        plt.savefig(save_path)

    plt.show()
        

class SleepConvDataset(Dataset):
    def __init__(self, data, root_path, transforms=None):
        """
        data : (list) patients
        
        1. 모든 환자 에폭의 이미지의 경로를 추출한다.
        2. 모든 환자 에폭의 라벨을 추출한다.
        """
        
        self.paths = []
        self.labels = []
        self.numbers = []
        self.transforms = transforms
        self.sleepstaging_label_names = ['Wake', 'NREM', 'REM']
        
        for patient in data:
            start = True

            patient_number = patient['Patient_Number']
            events = patient['Event']

            self.numbers.append(patient_number)
            
            branch = '-'.join(patient_number.split('-')[:-1])
            image_folder_path = root_path / branch / patient_number / f"{patient_number}_standard"

            for i in range(0, len(events)):
                stage = events[i]['Event_Label']

                if stage == 'R' or stage == 'REM':
                    stage = 'REM'
                
                elif stage == 'Wake':
                    stage = 'Wake'
                    
                elif stage == 'N1':
                    stage = 'NREM'
                    
                elif stage == 'N2':
                    stage = 'NREM'
                    
                elif stage == 'N3':
                    stage = 'NREM'
                
                else:
                    continue

                if start:
                    start = False

                    init_start_epoch = int(events[i]['Start_Epoch'])
                    init_end_epoch = int(events[i]['End_Epoch'])

                    for epoch in range(init_start_epoch, init_end_epoch):
                        image_number = str(epoch).zfill(4)

                        label = self.sleepstaging_label_names.index(stage)
                        image_path = image_folder_path / f"{patient_number}_{image_number}.png"

                        if os.path.exists(image_path):
                            self.paths.append(image_path)
                            self.labels.append(label)

                else:
                    start_epoch = int(events[i]['Start_Epoch'])
                    end_epoch = int(events[i]['End_Epoch'])

                    if init_end_epoch <= start_epoch:
                        # 이전 end epoch과 현재 start epoch이 큰 경우 이전 epoch들은 Wake로 채운다.
                        # 1. 이전 end epoch < 현재 start epoch
                        # 2. 이전 end epoch ~ 현재 start epoch : Wake
                        if init_end_epoch < start_epoch:
                            for epoch in range(init_end_epoch, start_epoch):
                                image_number = str(epoch).zfill(4)

                                label = self.sleepstaging_label_names.index("Wake")
                                image_path = image_folder_path / f"{patient_number}_{image_number}.png"

                                if os.path.exists(image_path):
                                    self.paths.append(image_path)
                                    self.labels.append(label)

                        # 현재 start epoch ~ end epoch : Stage
                        for epoch in range(start_epoch, end_epoch):
                            image_number = str(epoch).zfill(4)

                            label = self.sleepstaging_label_names.index(stage)
                            image_path = image_folder_path / f"{patient_number}_{image_number}.png"

                            if os.path.exists(image_path):
                                self.paths.append(image_path)
                                self.labels.append(label)

                        init_end_epoch = end_epoch
        
    def __len__(self):
        return len(self.labels)
        
    def __getitem__(self, idx):
        img = Image.open(self.paths[idx])
        label = self.labels[idx]
        file_name = self.paths[idx].parts[-1]
        
        if self.transforms is not None:
            img = self.transforms(img)
            
        return (img, label, file_name)

    
class SleepSeqDataset(Dataset):
    def __init__(self, data, root_path, seq_len, label_names, transforms=None):
        """
        data : (list) patients
        
        1. 모든 환자 에폭의 이미지의 경로를 추출한다.
        2. 모든 환자 에폭의 라벨을 추출한다.
        """
        
        self.total_paths = []
        self.total_labels = []
        self.total_number = []
        self.seq_len = seq_len
        self.pad_len = seq_len // 2

        for patient in data:
            paths = []
            labels = []
            
            start = True

            patient_number = patient['Patient_Number']
            events = patient['Event']

            branch = '-'.join(patient_number.split('-')[:-1])
            image_folder_path = root_path / branch / patient_number / f"{patient_number}_standard"

            for i in range(0, len(events)):
                stage = events[i]['Event_Label']

                if stage == 'R':
                    stage = 'REM'

                if stage not in label_names:
                    continue

                if start:
                    start = False

                    init_start_epoch = int(events[i]['Start_Epoch'])
                    init_end_epoch = int(events[i]['End_Epoch'])

                    for epoch in range(init_start_epoch, init_end_epoch):
                        image_number = str(epoch).zfill(4)

                        label = label_names.index(stage)
                        image_path = image_folder_path / f"{patient_number}_{image_number}.png"

                        if os.path.exists(image_path):
                            paths.append(image_path)
                            labels.append(label)

                else:
                    start_epoch = int(events[i]['Start_Epoch'])
                    end_epoch = int(events[i]['End_Epoch'])

                    if init_end_epoch <= start_epoch:
                        # 이전 end epoch이 현재 start epoch이 큰 경우 이전 epoch들은 Wake로 채운다.
                        # 1. 이전 end epoch < 현재 start epoch
                        # 2. 이전 end epoch ~ 현재 start epoch : Wake
                        if init_end_epoch < start_epoch:
                            for epoch in range(init_end_epoch, start_epoch):
                                image_number = str(epoch).zfill(4)

                                label = label_names.index("Wake")
                                image_path = image_folder_path / f"{patient_number}_{image_number}.png"

                                if os.path.exists(image_path):
                                    paths.append(image_path)
                                    labels.append(label)

                        # 현재 start epoch ~ end epoch : Stage
                        for epoch in range(start_epoch, end_epoch):
                            image_number = str(epoch).zfill(4)

                            label = label_names.index(stage)
                            image_path = image_folder_path / f"{patient_number}_{image_number}.png"

                            if os.path.exists(image_path):
                                paths.append(image_path)
                                labels.append(label)

                        init_end_epoch = end_epoch
                        
            if len(paths) > 0:    
                self.total_paths.append(paths)
                self.total_labels.append(labels)
                self.total_number.append(patient_number)
            
        self.transforms = transforms
        
    def __len__(self):
        return len(self.total_paths)
        
    def __getitem__(self, idx):
        paths = self.total_paths[idx]
        labels = self.total_labels[idx]
        labels = np.array(labels)
        
        number = self.total_number[idx]
        
        start_pad = [paths[0] for _ in range(self.pad_len)]
        end_pad = [paths[-1] for _ in range(self.pad_len)]

        paths = np.append(start_pad, paths)
        paths = np.append(paths, end_pad)

        seq = []

        for p in paths:
            img = Image.open(p)

            if self.transforms is not None:
                img = self.transforms(img)

            seq.append(img)

        seq = torch.stack(seq, dim=1).squeeze(0)
        seq = seq.unfold(0, self.seq_len, 1).permute(0, 3, 1, 2)

        return (seq, labels, number)
    

def train(model, train_loader, optimizer, criterion, device="cuda"):
    model.train()

    total = len(train_loader)
    train_correct = 0
    train_loss = 0

    for (data, labels, _) in tqdm(train_loader, total=total):
        optimizer.zero_grad()
        
        data = data.float().to(device)
        labels = labels.long().to(device)
        
        pred = model(data)
        _, predicted = torch.max(pred, 1)

        train_correct += (predicted == labels).sum().item()

        loss = criterion(pred, labels)
        train_loss += loss.item()
        loss.backward()
        optimizer.step()

    return train_correct, train_loss


def valid(model, valid_loader, criterion, device="cuda"):
    model.eval()

    total = len(valid_loader)
    valid_correct = 0
    valid_loss = 0

    for (data, labels, _) in tqdm(valid_loader, total=total):
        data = data.float().to(device)
        labels = labels.long().to(device)

        pred = model(data)
        _, predicted = torch.max(pred, 1)

        valid_correct += (predicted == labels).sum().item()

        loss = criterion(pred, labels)
        valid_loss += loss.item()

    return valid_correct, valid_loss


def test(model, test_loader, criterion, device="cuda"):
    model.eval()

    total = len(test_loader)
    test_correct = 0
    test_loss = 0

    for data, labels in tqdm(test_loader, total=total):
        data = data.float().to(device)
        labels = labels.long().to(device)

        pred = model(data)
        _, predicted = torch.max(pred, 1)

        test_correct += (predicted == labels).sum().item()

        loss = criterion(pred, labels)
        test_loss += loss.item()

    return test_correct, test_loss  


def get_resnet50(num_classes, pretrained=False):
    model = models.resnet50(pretrained=pretrained)
    model.conv1 = nn.Conv2d(1, 64, kernel_size=(7, 7), stride=(2, 2), padding=(3, 3), bias=False)
    model.fc = nn.Linear(model.fc.in_features, num_classes)
    
    return model