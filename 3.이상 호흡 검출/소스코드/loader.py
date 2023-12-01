import csv
import os
import gzip
from os import listdir
import math
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from multiprocessing import Pool, cpu_count
import sys
from torch.utils import data
from torchvision import datasets, transforms
import random
from scipy import ndimage
from PIL import Image
import math
import glob
import torch
import json
from torch.nn.utils.rnn import pad_sequence, pack_padded_sequence
# import pyvips


def transform_image(image, seq_len, phase, h=1080, w=1920):
    # Original Image shape : 1080, 1920
    # Concated Image shape : 1080, 1920*n , (default n=3)
    # Resized Image shape : 270, 1920*n/4
    h= h/4
    w = w/4 * seq_len
    custom_transformer = transforms.Compose([
                transforms.ToTensor(),
                transforms.Normalize((0.0529),(0.1389)),
                ])
    service_transformer = transforms.Compose([
                transforms.ToTensor(),
                transforms.Resize((h,w)),
                transforms.Normalize((0.0529),(0.1389)),
                ])

    if phase != 'service' : image_tr = custom_transformer(image)
    elif phase == 'sevice' : image_tr = service_transformer(image)

    return image_tr


class CustomDataset(data.Dataset):
    def __init__(self, phase='train', root='./Dataset_Normalized_concat', seq_len=3, fold=1, label_mode = '', json_path = './Json/Annotation.json'):
        self.root = root
        self.phase = phase
        self.seq_len = seq_len
        self.data = {}

        if label_mode == '' : path = os.path.join(root,self.phase+'set_image-'+str(fold)+'.csv')
        elif label_mode == 'apnea' : path = os.path.join(root,self.phase+'set_image_apnea.csv')
        f = open(path, 'r', encoding='utf-8-sig')
        rdr = csv.reader(f)
        
        lst_img = []
        lst_label = []
        lst_patient = []
        for idx, item in enumerate(rdr):
            path_img = item[0]
            patient_num = path_img.split('/')[3]
            label = item[1]
            lst_img.append(path_img)
            lst_patient.append(patient_num)
            lst_label.append(float(label))
        print('!!!!!!!!', len(lst_patient))
        self.data['image'] = lst_img
        self.data['label'] = lst_label
        self.data['patient'] = lst_patient
        

    def __getitem__(self, index):
        path = self.data['image'][index]
        img = Image.open(path)
        img = transform_image(img, self.seq_len, self.phase)

        label = self.data['label'][index]
        patient = self.data['patient'][index]
        return img, label, patient, path

        
    def __len__(self):
        return len(self.data['image'])

def check_label(root, phase='Train'):
    meta_path = os.path.join(root, phase)+'.csv'
    with open(meta_path, 'r', encoding='utf-8-sig') as f:
        rdr = csv.reader(f)
        label_list = []
        for idx, item in enumerate(rdr) :
            label_list.append(int(item[1]))         
    return (label_list)

def data_loader(phase, path_dataset, seq_len = 3, fold=1, label_mode = '', batch_size = 1, num_workers = int(cpu_count() * 0.5), sampler_flag = True):
    path_dataset = path_dataset + str(seq_len)
    dataset = CustomDataset(phase=phase, root=path_dataset, seq_len = seq_len, fold = fold, label_mode = label_mode)

    if phase == 'train' and sampler_flag:
        #define sampler to imabalance data
        if label_mode == '' : label_list = check_label(path_dataset,phase+'set_image-'+str(fold))
        elif label_mode == 'apnea' : label_list = check_label(path_dataset,phase+'set_image_apnea')

        class_sample_count = np.array([len(np.where(label_list==t)[0]) for t in np.unique(label_list)])
        weight = 1. / class_sample_count
        samples_weight = np.array([weight[t] for t in label_list])
        samples_weight = torch.from_numpy(samples_weight)
        sampler = torch.utils.data.sampler.WeightedRandomSampler(samples_weight.type('torch.DoubleTensor'), len(samples_weight))
        dataloader = data.DataLoader(dataset=dataset, batch_size=batch_size, sampler = sampler, num_workers = num_workers)
        return dataloader

    elif phase == 'train' and not(sampler_flag) :
        dataloader = data.DataLoader(dataset=dataset, batch_size=batch_size,  num_workers = num_workers, shuffle=True)
        return dataloader

    elif phase =='val' or phase =='test':
        dataloader = data.DataLoader(dataset=dataset, batch_size=batch_size, shuffle=False, num_workers = int(cpu_count() * 0.3))
        return dataloader
