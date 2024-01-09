import json
import argparse
import matplotlib.pyplot as plt
import numpy as np

def load_data(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)

def aggregate_yearly_data(data, year):
    yearly_data = {key: [] for key in data[next(iter(data))].keys()}  # Initialize with keys
    for month, values in data.items():
        if month.startswith(year):
            for key, value in values.items():
                yearly_data[key].append(value)
    # Calculate averages
    for key in yearly_data.keys():
        yearly_data[key] = sum(yearly_data[key]) / len(yearly_data[key]) if yearly_data[key] else None
    return yearly_data

def compare_data(data, year1, year2):
    data_year1 = aggregate_yearly_data(data, year1)
    data_year2 = aggregate_yearly_data(data, year2)

    if not data_year1 or not data_year2:
        print(f"Data not available for both years: {year1} and {year2}")
        return

        # Example: Compare Average Max Temperature
    avg_max_temp_year1 = data_year1['AverageMaxTemperature']
    avg_max_temp_year2 = data_year2['AverageMaxTemperature']

    # Calculate statistics
    diff_avg_max_temp = avg_max_temp_year2 - avg_max_temp_year1

    # Print statistics
    print(f"Difference in Average Max Temperature between {year1} and {year2}: {diff_avg_max_temp}°C")

    # Plotting the data
    categories = list(data_year1.keys())
    values_year1 = list(data_year1.values())
    values_year2 = list(data_year2.values())

    bar_width = 0.35
    index = np.arange(len(categories))

    plt.bar(index, values_year1, bar_width, label=year1)
    plt.bar(index + bar_width, values_year2, bar_width, label=year2)

    plt.xlabel('Climate Parameters')
    plt.ylabel('Values')
    plt.title(f'Climate Comparison between {year1} and {year2}')
    plt.xticks(index + bar_width / 2, categories)
    plt.legend()

    plt.tight_layout()
    plt.show()

    # Proceed with comparison as before...

def main():
    parser = argparse.ArgumentParser(description='Climate Data Processor')
    parser.add_argument('--file', type=str, required=True, help='Path to the JSON data file')
    parser.add_argument('--compare', nargs=2, metavar=('YEAR1', 'YEAR2'), help='Compare data between two years')

    args = parser.parse_args()

    data = load_data(args.file)

    if args.compare:
        compare_data(data, *args.compare)

if __name__ == "__main__":
    main()
