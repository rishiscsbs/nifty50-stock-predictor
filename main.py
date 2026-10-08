"""
Stock Market Predictor — menu-driven CLI mock (PBL report).

Run: python main.py

Matches report §5.3: ten menu options, bundled NIFTY 50 dataset, mock training,
full ML study tables, and results/ figures (no live ML in this demo build).
"""

from __future__ import annotations

import csv
import random
import time
from datetime import date, timedelta
from pathlib import Path

from cli_ui import (
    banner,
    clear_screen,
    copy_report_figures,
    info,
    ok,
    open_results_folder,
    pause,
    print_table,
    prompt_choice,
    rule,
    warn,
)
from mock_data import (
    CLASSIFICATION_MODELS,
    DATASET_PREVIEW_ROWS,
    DATA_CSV,
    FIGURES_SRC,
    FULL_ML_STUDY,
    MENU_OPTIONS,
    REGRESSION_MODELS,
    RESULT_FIGURES,
    RESULTS_DIR,
    AppState,
)

DATE_FROM = "2012-02-21"
DATE_TO = "2026-09-25"
ROW_COUNT = 3601


def ensure_figure_assets() -> None:
    extracted = Path(__file__).resolve().parent / "extracted_media"
    FIGURES_SRC.mkdir(parents=True, exist_ok=True)
    mapping = {
        "architecture.png": "image5.png",
        "market_regime.png": "image10.png",
        "holdout_performance.png": "image12.png",
        "roc_curve.png": "image14.png",
        "bias_variance.png": "image15.png",
        "actual_vs_predicted.png": "image16.png",
        "confusion_matrix.png": "image13.png",
        "price_ma_volume.png": "image10.png",
        "correlation_heatmap.png": "image12.png",
        "target_distribution.png": "image13.png",
    }
    for dest, src in mapping.items():
        target = FIGURES_SRC / dest
        if target.is_file():
            continue
        source = extracted / src
        if source.is_file():
            target.write_bytes(source.read_bytes())


def ensure_dataset() -> Path:
    if DATA_CSV.is_file():
        return DATA_CSV
    warn("Bundled nifty50_data.csv not found - generating deterministic mock OHLCV...")
    random.seed(42)
    start = date(2012, 2, 21)
    close = 5607.15
    rows: list[tuple] = []
    d = start
    for _ in range(ROW_COUNT):
        ret = random.gauss(0.0003, 0.012)
        open_p = close
        close = max(1000.0, close * (1 + ret))
        high = max(open_p, close) * (1 + random.uniform(0, 0.006))
        low = min(open_p, close) * (1 - random.uniform(0, 0.006))
        vol = random.uniform(1.2e8, 2.6e8)
        rows.append((d.isoformat(), round(open_p, 2), round(high, 2), round(low, 2), round(close, 2), round(vol, 1)))
        d += timedelta(days=1)
    with DATA_CSV.open("w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["Date", "Open", "High", "Low", "Close", "Volume"])
        w.writerows(rows)
    ok(f"Created {DATA_CSV.name} ({len(rows)} rows).")
    return DATA_CSV


def count_csv_rows(path: Path) -> int:
    with path.open(encoding="utf-8") as f:
        return sum(1 for _ in f) - 1


def print_main_menu() -> None:
    banner("STOCK MARKET PREDICTOR")
    for i, label in enumerate(MENU_OPTIONS, start=1):
        print(f"  {i}. {label}")
    print("=" * 56)


def startup_message(path: Path) -> None:
    rows = count_csv_rows(path)
    ok(
        f"Loaded {rows} NIFTY 50 trading days from '{path.name}' "
        f"({DATE_FROM} to {DATE_TO})."
    )


def action_download(_state: AppState) -> None:
    banner("DOWNLOAD STOCK DATA")
    warn("Fetching ^NSEI from Yahoo Finance via yfinance (mock — no network call)...")
    time.sleep(0.8)
    path = ensure_dataset()
    ok(f"Saved {path.resolve()}")
    ok(f"{count_csv_rows(path)} trading days written.")


def action_show_dataset(state: AppState) -> None:
    banner("DATASET PREVIEW (FIRST 10 ROWS)")
    print(f"{'Date':<12} {'Open':>10} {'High':>10} {'Low':>10} {'Close':>10} {'Volume':>16}")
    for row in DATASET_PREVIEW_ROWS:
        d, o, h, l, c, v = row
        print(f"{d:<12} {o:>10.2f} {h:>10.2f} {l:>10.2f} {c:>10.2f} {v:>16.1f}")
    rule()
    rows = count_csv_rows(state.dataset_path)
    print(f"Rows : {rows}")
    print("Columns : 5")
    print("Column Names : Open, High, Low, Close, Volume")
    print("Missing Values : 0")
    print(f"Dataset Location : {state.dataset_path.resolve()}")


def action_visualize(_state: AppState) -> None:
    banner("VISUALIZE DATASET")
    warn("Generating price, moving-average, volume, correlation and target charts (mock)...")
    time.sleep(0.6)
    viz_map = {
        "fig_price_ma_volume.png": "price_ma_volume.png",
        "fig_correlation_heatmap.png": "correlation_heatmap.png",
        "fig_target_distribution.png": "target_distribution.png",
    }
    written = copy_report_figures(FIGURES_SRC, RESULTS_DIR, viz_map)
    for p in written:
        ok(f"Saved {p.name}")
    if not written:
        warn("Figure assets missing — run from project folder with assets/figures.")
    else:
        ok(f"Charts saved under '{RESULTS_DIR.name}/'.")
        open_results_folder(RESULTS_DIR)


def action_train(state: AppState) -> None:
    banner("TRAIN MODELS")
    warn("Training regression models...")
    time.sleep(0.4)
    ok("Linear Regression (MAE = 154.87)")
    ok("Decision Tree Regressor (MAE = 4158.78)")
    ok("Random Forest Regressor (MAE = 3966.13)")
    warn("Training classification models...")
    time.sleep(0.4)
    ok("Logistic Regression, Decision Tree, Random Forest, KNN classifiers fitted.")
    ok("Saved saved_regression_model.pkl")
    ok("Saved saved_classification_model.pkl")
    ok("Model training completed successfully.")
    state.models_trained = True


def action_compare(_state: AppState) -> None:
    banner("MODEL COMPARISON")
    info("Regression Models (Price Prediction)")
    reg_rows = [[str(i), n, f"{mae:.2f}", f"{rmse:.2f}", f"{r2:.4f}"] for i, (n, mae, rmse, r2) in enumerate(REGRESSION_MODELS, 1)]
    print_table(["#", "Model", "MAE", "RMSE", "R2"], reg_rows)
    print()
    info("Classification Models (Trend Prediction)")
    cls_rows = []
    highlights: set[int] = set()
    for i, (name, acc, prec, rec, f1, best) in enumerate(CLASSIFICATION_MODELS, 1):
        tag = " [BEST]" if best else ""
        cls_rows.append([str(i), name + tag, f"{acc:.4f}", f"{prec:.4f}", f"{rec:.4f}", f"{f1:.4f}"])
        if best:
            highlights.add(i - 1)
    print_table(["#", "Model", "Accuracy", "Precision", "Recall", "F1"], cls_rows, highlights=highlights)
    print()
    info("[BEST CLASSIFIER]: 'Logistic Regression' achieved the highest overall classification performance.")


def action_predict_price(_state: AppState) -> None:
    banner("PREDICT FUTURE STOCK PRICE")
    print("Selected Model : Linear Regression")
    print("Data Available Up To : 2026-09-25")
    print("Prediction Date : 2026-09-28")
    info("Predicted Closing Price : 23,071.77 pts")


def action_predict_trend(state: AppState) -> None:
    banner("PREDICT TOMORROW TREND")
    if not state.study_completed:
        warn("Full ML study not run yet — using Random Forest from report (walk-forward CV selected).")
    print("Selected Classifier : Random Forest (walk-forward CV selected)")
    print("Data Available Up To : 2026-09-25")
    print("Prediction Date : 2026-09-28")
    info("Tomorrow's Trend : UP")
    print("P(UP) / P(DOWN) : 51.16% / 48.84%")
    print("Confidence : 51.16%")
    rule()
    warn(
        "Note: hold-out accuracy of daily direction models is close to 50%; "
        "treat this as a probability, not a trading signal."
    )


def action_stock_info(_state: AppState) -> None:
    banner("STOCK INFORMATION")
    print("Symbol : ^NSEI")
    print("Name : NIFTY 50")
    print("Exchange : National Stock Exchange of India (NSE)")
    print("Type : Market index (50 large-cap Indian equities)")
    print("Currency : INR")
    print("Data Source : Yahoo Finance (yfinance) or bundled CSV")
    print(f"Date Range : {DATE_FROM} to {DATE_TO}")
    print("Train / Hold-out : 2840 / 711 days")
    print("UP-day share (train / hold-out) : 53.9% / 52.6%")
    print("Iteration 1 features : OHLCV, SMA-20, EMA-20, daily return, RSI-14, MACD")
    print(
        "Iteration 2 features : 16 stationary indicators + K-Means regime "
        "(Bullish / Sideways / Bearish)"
    )
    print("Labelled days : 3551")
    print("Live prediction row : 2026-09-25 (unlabelled)")


def action_full_study(state: AppState) -> None:
    ok("Iteration 1: baseline models on the original feature set...")
    time.sleep(0.3)
    ok("Iteration 2: stationary features, regimes, ensembles, MLP, walk-forward CV...")
    time.sleep(0.3)
    ok("Tuning MLP neural network (walk-forward grid search)...")
    time.sleep(0.4)
    ok("Walk-forward CV: 5 folds (10 models)")
    banner("FULL ML STUDY - NIFTY 50 NEXT-DAY DIRECTION")
    print("Train: 2012-05-02 to 2023-11-12 (2840 days)")
    print("Hold-out: 2023-11-13 to 2026-09-24 (711 days)")
    print()
    rows = []
    highlights: set[int] = set()
    for i, row in enumerate(FULL_ML_STUDY):
        name, cv, acc, bal, f1, mcc, test_auc, selected = row
        label = name + (" *" if selected else "")
        rows.append([label, f"{cv:.4f}", acc, bal, f1, mcc, test_auc])
        if selected:
            highlights.add(i)
    print_table(["Model", "CV AUC", "Test Acc", "Bal Acc", "F1", "MCC", "Test AUC"], rows, highlights=highlights)
    print()
    info("* Selected by walk-forward CV ROC-AUC: Random Forest")
    info("Bootstrap 95% CI of its hold-out accuracy: 48.66% - 55.98%")
    info("McNemar vs majority baseline : chi2 = 0.004, p = 0.9490")
    written = copy_report_figures(FIGURES_SRC, RESULTS_DIR, RESULT_FIGURES)
    if written:
        ok("Figures and tables saved in the 'results' folder.")
    state.study_completed = True


HANDLERS = {
    1: action_download,
    2: action_show_dataset,
    3: action_visualize,
    4: action_train,
    5: action_compare,
    6: action_predict_price,
    7: action_predict_trend,
    8: action_stock_info,
    9: action_full_study,
}


def main() -> None:
    ensure_figure_assets()
    path = ensure_dataset()
    state = AppState(dataset_path=path)

    while True:
        clear_screen()
        startup_message(path)
        print()
        print_main_menu()
        choice = prompt_choice().strip()
        if choice == "10":
            ok("Exiting Stock Market Predictor. Goodbye!")
            break
        if not choice.isdigit() or int(choice) not in HANDLERS:
            warn("Invalid choice. Enter a number from 1 to 10.")
            pause()
            continue
        HANDLERS[int(choice)](state)
        pause()


if __name__ == "__main__":
    main()
