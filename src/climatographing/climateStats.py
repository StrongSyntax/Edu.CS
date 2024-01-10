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

def plot_climograph(data_year1, data_year2, year1, year2):
    # Assume data_year1 and data_year2 are dictionaries with months as keys and dict of parameters as values
    months = [f"{str(month).zfill(2)}" for month in range(1, 13)]
    temp_1 = [data_year1.get(f"{year1}-{month}", {}).get('OverallAverageTemperature', 0) for month in months]
    temp_2 = [data_year2.get(f"{year2}-{month}", {}).get('OverallAverageTemperature', 0) for month in months]
    precip_1 = [data_year1.get(f"{year1}-{month}", {}).get('AveragePrecipitation', 0) for month in months]
    precip_2 = [data_year2.get(f"{year2}-{month}", {}).get('AveragePrecipitation', 0) for month in months]

    fig, ax1 = plt.subplots()

    ax1.set_xlabel('Month')
    ax1.set_ylabel('Temperature (°C)', color='tab:red')
    ax1.plot(months, temp_1, color='tab:red', label=f'{year1} Temperature')
    ax1.plot(months, temp_2, color='tab:blue', label=f'{year2} Temperature', linestyle='--')
    ax1.tick_params(axis='y', labelcolor='tab:red')

    ax2 = ax1.twinx()
    ax2.set_ylabel('Precipitation (mm)', color='tab:green')
    ax2.bar(months, precip_1, alpha=0.5, color='tab:green', label=f'{year1} Precipitation')
    ax2.bar(months, precip_2, alpha=0.5, color='tab:olive', label=f'{year2} Precipitation', width=0.4)
    ax2.tick_params(axis='y', labelcolor='tab:green')

    lines, labels = ax1.get_legend_handles_labels()
    lines2, labels2 = ax2.get_legend_handles_labels()
    ax2.legend(lines + lines2, labels + labels2, loc='upper left')

    plt.title('Climograph Comparison')
    plt.show()

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

    plot_climograph(data_year1, data_year2, year1, year2)

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
