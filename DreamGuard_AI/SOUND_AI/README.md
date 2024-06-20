# SOUND API
## 수면호흡음을 통한 OSA 추론 API 

##### 파일 구조
```
sound_api
 ┣ data
 ┃ ┣ SC4001E0-PSG.edf
 ┃ ┣ SC4021E0-PSG.edf
 ┃ ┗ SC4051E0-PSG.edf
 ┣ model
 ┃ ┗ best_model.pt
 ┣ app.py
 ┣ data_preprocess.py
 ┣ EDF.py
 ┣ model_def.py
 ┣ model_eval.py
 ┣ model_print.py
 ┣ requirements.txt
 ┣ sample.py
 ┗ utils.py
```

#### model_eval.py : 실행파일 
```
...
def nia_api(input_edf_file):
    # Data processing
    extracted_data = preprocess(input_edf_file)
    if type(extracted_data) == bool and (extracted_data == False):
        # Error happened
        error = True
        return None, None, error

    # Load model
    model = NeuralNetwork().to(device)
    model_pt_file = 'model/best_model.pt'
    load_model(model, model_file=model_pt_file)
    model.eval()

    # Get probabilities
    prob = inference(extracted_data, model)  # Modified to receive only prob
    result = True if prob >= 0.5 else False
    error = False

    return result, prob, error
if __name__ == '__main__':

    device = 'cuda' if torch.cuda.is_available() else 'cpu'

    # Data
    test_file = 'data/SC4001E0-PSG.edf'

    # NIA API
    start = datetime.now()
    result, prob, error = nia_api(test_file)
    print('Elapsed time:', datetime.now() - start)
    print('\nResult:', result)
    print('Probability:', prob)
    print('Error:', error)
```
