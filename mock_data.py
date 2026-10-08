"""Static report values for the Stock Market Predictor CLI mock (PBL report)."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DATA_CSV = ROOT / "nifty50_data.csv"
RESULTS_DIR = ROOT / "results"
FIGURES_SRC = ROOT / "assets" / "figures"

MENU_OPTIONS = [
    "Download Stock Data",
    "Show Dataset",
    "Visualize Dataset",
    "Train Models",
    "Compare Models",
    "Predict Future Stock Price",
    "Predict Tomorrow Trend",
    "Stock Information",
    "Run Full ML Study (Units I-V)",
    "Exit",
]

DATASET_PREVIEW_ROWS = [
    ("2012-02-21", 5561.90, 5621.50, 5561.75, 5607.15, 231132126.0),
    ("2012-02-22", 5614.65, 5624.20, 5586.30, 5614.50, 193567890.0),
    ("2012-02-23", 5620.10, 5648.75, 5605.20, 5634.20, 178234512.0),
    ("2012-02-24", 5638.50, 5655.00, 5610.80, 5622.45, 165890443.0),
    ("2012-02-27", 5625.00, 5680.30, 5618.90, 5675.10, 201445678.0),
    ("2012-02-28", 5680.00, 5695.40, 5650.20, 5668.75, 187654321.0),
    ("2012-02-29", 5665.30, 5678.90, 5632.10, 5645.60, 176543210.0),
    ("2012-03-01", 5648.00, 5710.50, 5640.00, 5702.30, 198765432.0),
    ("2012-03-02", 5705.00, 5725.80, 5688.40, 5718.90, 182345678.0),
    ("2012-03-03", 5720.00, 5735.20, 5695.60, 5705.40, 169876543.0),
]

REGRESSION_MODELS = [
    ("Linear Regression", 154.87, 215.31, 0.9776),
    ("Decision Tree Regressor", 4158.78, 4397.26, -8.3387),
    ("Random Forest Regressor", 3966.13, 4212.21, -7.5692),
]

CLASSIFICATION_MODELS = [
    ("Logistic Regression", 0.5146, 0.5259, 0.7798, 0.6282, True),
    ("Decision Tree Classifier", 0.5077, 0.5441, 0.3926, 0.4561, False),
    ("Random Forest Classifier", 0.4798, 0.5588, 0.0504, 0.0925, False),
    ("K-Nearest Neighbors Classifier", 0.4923, 0.5190, 0.4721, 0.4944, False),
]

FULL_ML_STUDY = [
    ("Majority Baseline", 0.5000, "52.60%", "50.00%", "0.6894", "+0.000", "-", False),
    ("Logistic Regression", 0.5276, "53.02%", "51.72%", "0.6322", "+0.040", "0.5189", False),
    ("Naive Bayes", 0.5439, "50.07%", "50.54%", "0.4662", "+0.011", "0.5195", False),
    ("SVM (RBF)", 0.5519, "51.48%", "50.30%", "0.6128", "+0.007", "0.5266", False),
    ("Decision Tree", 0.5291, "52.60%", "50.00%", "0.6894", "+0.000", "0.5071", False),
    ("Random Forest", 0.5538, "52.32%", "51.51%", "0.5969", "+0.032", "0.5295", True),
    ("KNN (k=25)", 0.5366, "48.95%", "48.42%", "0.5468", "-0.032", "0.4978", False),
    ("Gradient Boosting", 0.5460, "50.49%", "50.06%", "0.5533", "+0.001", "0.5087", False),
    ("Soft Voting Ensemble", 0.5489, "53.16%", "52.37%", "0.6031", "+0.050", "0.5235", False),
    ("MLP Neural Network", 0.5447, "52.32%", "51.22%", "0.6152", "+0.027", "0.5221", False),
]

RESULT_FIGURES = {
    "fig_4_1_system_architecture.png": "architecture.png",
    "fig_5_3_5_market_regime.png": "market_regime.png",
    "fig_6_2_holdout_performance.png": "holdout_performance.png",
    "fig_6_2_roc_curve.png": "roc_curve.png",
    "fig_6_2_bias_variance.png": "bias_variance.png",
    "fig_6_2_actual_vs_predicted.png": "actual_vs_predicted.png",
    "fig_6_2_confusion_matrix.png": "confusion_matrix.png",
}

VISUALIZE_FIGURES = [
    "fig_price_ma_volume.png",
    "fig_correlation_heatmap.png",
    "fig_target_distribution.png",
]

@dataclass
class AppState:
    models_trained: bool = False
    study_completed: bool = False
    dataset_path: Path = DATA_CSV
