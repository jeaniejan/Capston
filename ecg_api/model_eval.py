import torch
import numpy as np
from ResNetAndrewNg import ResNetAndrewNg
import pandas as pd
import wfdb
from biosppy.signals import ecg
from datetime import datetime
# 필요한 함수 정의

def find_percentile(score):
    per_commnet = '백분위수 계산 중 . . .'
    print(per_commnet)
    rounded_score = round(score, 2)
    row = df[df['Score'].round(2) == rounded_score]
    if not row.empty:
        return row['Percentile'].iloc[0]
    else:
        return "해당 Score 값을 가진 데이터가 없습니다."

def model_inference(model, input_tensor):
    model.eval()
    prob = model(input_tensor.float())[0][1].item()
    return prob

def adjust_len(arr, desire_len=256):
    adj_comment = '데이터 조정 중 . . .'
    print(adj_comment)
    if len(arr) > desire_len:
        arr = arr[:desire_len]
    elif len(arr) < desire_len:
        zero_n = desire_len - len(arr)
        arr = np.pad(arr, (0, zero_n))
    return arr

def get_rpeaks_from_dat(record_name):
    rpeack_comment = 'ECG Rpeaks 추출 . . .'
    print(rpeack_comment)
    record = wfdb.rdrecord(record_name)
    raw_data = record.p_signal[:, 0]
    Hz = record.fs
    out = ecg.ecg(signal=raw_data, sampling_rate=Hz, show=False)
    return out['rpeaks']

def get_hr_from_rpeaks(rpeak_arr, hz, window, step):
    hr_comment = 'Rpeacks로 부터 hr 추출 중. . .'
    hr_sec_list = list()
    print(hr_comment)
    for idx in range(int(np.ceil(rpeak_arr.max()/(hz*step)))):
        target_rpeaks = rpeak_arr[(rpeak_arr >= hz*step*idx) & (rpeak_arr < (hz*step*idx) + (hz*window))]
        rr_interval_median = np.median(np.diff(target_rpeaks))
        hr = 60*hz/rr_interval_median
        hr_sec_list.append(hr)
    return hr_sec_list

# 새로운 데이터에 대한 예측 확률을 반환하는 함수
def predict_new_data(record_name):
    checkpoint = torch.load('model/checkpoint_hr_sleep.pth', map_location=torch.device('cpu'))
    load_comment = '모델 로드 중 . . .'
    config = checkpoint['config']
    weight = checkpoint['weight']
    model = ResNetAndrewNg(config)
    model.load_state_dict(weight)
    print(load_comment)
    model.eval()

    # .dat 파일 로드 및 전처리
    pre_comment = '데이터 전처리 중 . . .'
    print(pre_comment)
    rpeaks = get_rpeaks_from_dat(record_name)
    hr_arr = get_hr_from_rpeaks(np.array(rpeaks), hz=100, window=300, step=300) 
    hr_arr = np.nan_to_num(hr_arr)
    hr_arr = adjust_len(hr_arr, desire_len=256)
    # 모델 추론
    interf_comment = '추론 중 . . .'
    print(interf_comment)
    hr_tensor = torch.from_numpy(np.array(hr_arr))
    hr_tensor = hr_tensor.unsqueeze(0).unsqueeze(0)
    prob = model_inference(model, hr_tensor)

    return prob

if __name__ == "__main__":
    # test_data 
    # a01_data/a01으로 수정 
    df = pd.read_csv('data/percentile_dummy.csv')
    record_name = 'data/apnea-ecg-database-1.0.0/a01' 
    start_comment = '수면 무호흡증 진단을 시작합니다 . . .'
    print(start_comment)
    start = datetime.now()
    prob = predict_new_data(record_name)
    print(f"Predicted probability: {prob}")
    print(f"Percentile(high): {find_percentile(prob)}")
    print('Elapsed time:', datetime.now() - start)
