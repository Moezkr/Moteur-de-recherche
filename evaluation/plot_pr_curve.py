import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import precision_recall_curve, auc

def plot_precision_recall(file_path):
    try:
        df = pd.read_excel(file_path, header=0)
        df.columns = df.columns.str.strip().str.title()
        
        df = df[['Query', 'Url', 'Relevant', 'Model']].dropna()
        df['Model'] = df['Model'].str.title()
        df['Relevant'] = df['Relevant'].astype(int)
        
    except Exception as e:
        print(f"Erreur lors du chargement des données: {e}")
        return

    plt.figure(figsize=(10, 7))
    plt.title("Courbe Précision-Rappel (P-R) - Modèles de RI")
    plt.xlabel("Rappel (Recall)")
    plt.ylabel("Précision (Precision)")
    plt.grid(True, linestyle='--', alpha=0.6)

    model_performance = {}

    for model_name in ['Boolean', 'Vectoriel']:
        relevant_docs = df[df['Relevant'] == 1]['Url'].unique()
        retrieved_by_model = df[df['Model'] == model_name]['Url'].unique()
        
        total_retrieved = df[df['Model'] == model_name].shape[0]
        total_relevant_in_retrieved = df[(df['Model'] == model_name) & (df['Relevant'] == 1)].shape[0]
        
        total_true_relevant = df[df['Relevant'] == 1].groupby('Query').size().sum()
        
        agg_precision = total_relevant_in_retrieved / total_retrieved if total_retrieved > 0 else 0
        agg_recall = total_relevant_in_retrieved / total_true_relevant if total_true_relevant > 0 else 0

        if agg_recall > 0 or agg_precision > 0:
            plt.plot(agg_recall, agg_precision, marker='o', markersize=10, 
                     label=f'{model_name} (P={agg_precision:.2f}, R={agg_recall:.2f})', 
                     linestyle='')

    plt.plot(1.0, 1.0, marker='*', markersize=15, color='gold', label="Performance Idéale", linestyle='')
    
    plt.legend()
    plt.xlim([0.0, 1.05])
    plt.ylim([0.0, 1.05])
    
    output_file = 'precision_recall_curve.png'
    plt.savefig(output_file)
    print(f"\nGraphique de la Courbe P-R (Approximée) généré: {output_file}")


if __name__ == "__main__":
    xlsx_file = 'ground_truth.xlsx'
    try:
        import matplotlib.pyplot as plt
        plot_precision_recall(xlsx_file)
    except ImportError:
        print("\nERREUR: La bibliothèque 'matplotlib' n'est pas installée.")
        print("         Pour le Bonus, installez-la : pip install matplotlib")