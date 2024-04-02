from torch import torch


model =torch.load('model/best_model.pt', map_location=torch.device('cpu'))

print(model)
print("done")