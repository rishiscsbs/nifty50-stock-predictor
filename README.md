# NIFTY 50 Stock Market Predictor (CLI mock)

Menu-driven **command-line** application matching the PBL report (`ML_PBL_Report_Srijith_Rishi_1.docx`) — same ten options as `main.py` in the report, report metrics, and `results/` figures.

This is a **frontend/demo mock**: no scikit-learn training; outputs mirror the written report.

## Setup

```bash
cd s:\PROJECTS\rishi
pip install -r requirements.txt
python main.py
```

On first run, `nifty50_data.csv` is created (3,601 rows) if missing. Report charts are copied from `assets/figures/` (auto-filled from `extracted_media/` when present).

## Menu (report §5.3)

1. Download Stock Data  
2. Show Dataset  
3. Visualize Dataset → saves charts under `results/`  
4. Train Models  
5. Compare Models  
6. Predict Future Stock Price  
7. Predict Tomorrow Trend  
8. Stock Information  
9. Run Full ML Study (Units I–V)  
10. Exit  

## Note on the Next.js folder

`stock-predictor-web/` was the earlier browser mock. Use **`python main.py`** for the CLI version.
