# ECG를 통한 OSA 진단 (위험점수 및 상위 백분위 계측) AI 모델 서빙 API

### 방법
1. 가상환경에 requirements.txt 내 라이브러리 설치
2. 가상환경 실행
3. 작업 디렉토리를 ECG_AI(app.py가 있는 폴더)로 이동
4. 터미널에서 python app.py
   - [localhost](http://localhost:5000/upload) 엔드포인트
   - 파일 업로드(ZIP 형식)
   - 업로드하면 API에서 압축 해제 후 AI 추론
   - 위험점수(Prob)과 상위 백분위(Percentile)를 JSON 형태로 반환함
   - ![image](https://github.com/jeaniejan/Capston/assets/121528605/1a75357f-d788-49cf-a668-16d500fceee0)
