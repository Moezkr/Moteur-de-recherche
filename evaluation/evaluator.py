import pandas as pd
import numpy as np

def calculate_precision(true_positives, retrieved_count):
    return true_positives / retrieved_count if retrieved_count > 0 else 0

def calculate_recall(true_positives, relevant_in_corpus_count):
    return true_positives / relevant_in_corpus_count if relevant_in_corpus_count > 0 else 0

def calculate_f1_score(precision, recall):
    if (precision + recall) == 0:
        return 0
    return (2 * precision * recall) / (precision + recall)

def run_evaluation(file_path):
    try:
        df = pd.read_excel(file_path, header=0)
        
        df.columns = df.columns.str.strip().str.title()
        
        EXPECTED_NAMES = ['Query', 'Url', 'Relevant', 'Model']
        if not all(col in df.columns for col in EXPECTED_NAMES):
            raise KeyError(f"Missing one or more expected columns: {EXPECTED_NAMES}. Found: {list(df.columns)}")

        df['Relevant'] = df['Relevant'].astype(int)
        df['Model'] = df['Model'].astype(str).str.strip().str.title() 
        df.dropna(subset=['Query', 'Url', 'Relevant', 'Model'], inplace=True)
        
    except Exception as e:
        print(f"Error reading and cleaning data from Excel file: {e}")
        return pd.DataFrame() 

    corpus_relevant_counts = df[df['Relevant'] == 1].groupby('Query')['Url'].nunique()
    results = []

    for query in df['Query'].unique():
        R = corpus_relevant_counts.get(query, 0)

        for model_name in ['Boolean', 'Vectoriel']:
            model_df = df[(df['Query'] == query) & (df['Model'] == model_name)]
            
            A = len(model_df) 
            R_cap_A = len(model_df[model_df['Relevant'] == 1])
            
            P = calculate_precision(R_cap_A, A)
            R_metric = calculate_recall(R_cap_A, R)
            F1 = calculate_f1_score(P, R_metric)
            
            results.append({
                'Query': query,
                'Model': model_name,
                '|R| (Total Relevant)': R,
                '|A| (Retrieved)': A,
                '|R ∩ A| (True Positives)': R_cap_A,
                'Precision': P,
                'Recall': R_metric,
                'F1-Score': F1
            })

    final_df = pd.DataFrame(results).sort_values(by=['Query', 'Model'])
    return final_df

if __name__ == "__main__":
    xlsx_file = 'ground_truth.xlsx'
    print("Running evaluation...")

    try:
        results_df = run_evaluation(xlsx_file)
        
        if results_df.empty:
            print("No results to display.")
        else:
            display_cols = ['Query', 'Model', '|R| (Total Relevant)', '|A| (Retrieved)', '|R ∩ A| (True Positives)', 'Precision', 'Recall', 'F1-Score']
            
            formatted_df = results_df.copy()
            for col in ['|R| (Total Relevant)', '|A| (Retrieved)', '|R ∩ A| (True Positives)', 'Precision', 'Recall', 'F1-Score']:
                formatted_df[col] = formatted_df[col].map(lambda x: f"{x:.4f}" if isinstance(x, (float, np.floating)) else f"{int(x):d}" if isinstance(x, (int, np.integer)) else str(x))

            print("\n" + "="*80)
            print("Evaluation Results: Boolean vs. Vectoriel Model Comparison (P, R, F1)")
            print("="*80 + "\n")
            print(formatted_df[display_cols].to_string(index=False, na_rep='-'))

            markdown_df = formatted_df[display_cols].fillna('-')
            markdown_df.to_markdown('evaluation_report.md', index=False)

            print("\nResults saved to evaluation_report.md")

    except FileNotFoundError:
        print(f"File not found: {xlsx_file}. Check path and file name.")
    except Exception as e:
        print(f"An error occurred during final execution: {e}")