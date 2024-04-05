import torch
import numpy as np
from ResNetAndrewNg import ResNetAndrewNg
import wfdb
from biosppy.signals import ecg
# 필요한 함수 정의

def model_inference(model, input_tensor):
    model.eval()
    prob = model(input_tensor.float())[0][1].item()
    return prob

def adjust_len(arr, desire_len=256):
    if len(arr) > desire_len:
        arr = arr[:desire_len]
    elif len(arr) < desire_len:
        zero_n = desire_len - len(arr)
        arr = np.pad(arr, (0, zero_n))
    return arr

def get_rpeaks_from_dat(record_name):
    # 레코드 읽기
    record = wfdb.rdrecord(record_name)
    # 신호 데이터 추출 (여기서는 첫 번째 채널을 ECG 신호로 가정)
    raw_data = record.p_signal[:, 0]
    # 샘플링 레이트 추출
    Hz = record.fs
    out = ecg.ecg(signal=raw_data, sampling_rate=Hz, show=False)
    return out['rpeaks']

def get_hr_from_rpeaks(rpeak_arr, hz, window, step):
    hr_sec_list = list()
    for idx in range(int(np.ceil(rpeak_arr.max()/(hz*step)))):
        target_rpeaks = rpeak_arr[(rpeak_arr >= hz*step*idx) & (rpeak_arr < (hz*step*idx) + (hz*window))]
        rr_interval_median = np.median(np.diff(target_rpeaks))
        hr = 60*hz/rr_interval_median
        hr_sec_list.append(hr)
    return hr_sec_list

# 새로운 데이터에 대한 예측 확률을 반환하는 함수
def predict_new_data(record_name):
    # 모델 및 가중치 로드
    checkpoint = torch.load('model/checkpoint_hr_sleep.pth', map_location=torch.device('cpu'))
    config = checkpoint['config']
    weight = checkpoint['weight']

    model = ResNetAndrewNg(config)
    model.load_state_dict(weight)
    model.eval()

    # .dat 파일 로드 및 전처리
    rpeaks = get_rpeaks_from_dat(record_name)
    hr_arr = get_hr_from_rpeaks(np.array(rpeaks), hz=100, window=300, step=300)  # Apnea 데이터셋의 샘플링 레이트를 확인하고 적절히 조정하세요.
    hr_arr = np.nan_to_num(hr_arr)
    hr_arr = adjust_len(hr_arr, desire_len=256)

    # 모델 추론
    hr_tensor = torch.from_numpy(np.array(hr_arr))
    hr_tensor = hr_tensor.unsqueeze(0).unsqueeze(0)
    prob = model_inference(model, hr_tensor)

    return prob

if __name__ == "__main__":
    record_name = 'data/apnea-ecg-database-1.0.0/a01' 
    prob = predict_new_data(record_name)
    print(f"Predicted probability: {prob}")
