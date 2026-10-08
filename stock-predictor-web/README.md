# NIFTY 50 Stock Market Predictor — Next.js UI Mock

Frontend-only replica of the **Predictive Analysis of Stock Prices Using Machine Learning Techniques** PBL report CLI (`main.py`), including report figures and metrics from `ML_PBL_Report_Srijith_Rishi_1.docx`.

## Run locally

```bash
cd stock-predictor-web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use the sidebar or terminal prompt (options 1–10).

## Features (report §5.3)

1. Download Stock Data  
2. Show Dataset (3,601 rows preview)  
3. Visualize Dataset (report charts)  
4. Train Models (Iteration 1)  
5. Compare Models (regression + classification tables)  
6. Predict Future Stock Price (Linear Regression → 23,071.77 pts)  
7. Predict Tomorrow Trend (Random Forest → UP @ 51.16%)  
8. Stock Information  
9. Run Full ML Study (Units I–V, walk-forward CV table)  
10. Exit  

Report images are in `public/report/` (architecture, CLI screenshots, regime, ROC, confusion matrix, etc.).

This mock does **not** call Python or train models; numbers match the written report.
