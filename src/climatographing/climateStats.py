import json
import matplotlib.pyplot as plt
import os

def load_data(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)

def plot_climograph(data, year1, year2):
    try:
        months = [f"{month:02d}" for month in range(1, 13)]
        temp_1, temp_2, precip_1, precip_2 = [], [], [], []

        for month in months:
            year_month_1 = f"{year1}-{month}"
            year_month_2 = f"{year2}-{month}"
            temp_1.append(data.get(year_month_1, {}).get('AverageMaxTemperature', 0))
            temp_2.append(data.get(year_month_2, {}).get('AverageMaxTemperature', 0))
            precip_1.append(data.get(year_month_1, {}).get('AveragePrecipitation', 0))
            precip_2.append(data.get(year_month_2, {}).get('AveragePrecipitation', 0))

        # Debugging prints
        print("Temperature Data Year 1:", temp_1)
        print("Temperature Data Year 2:", temp_2)
        print("Precipitation Data Year 1:", precip_1)
        print("Precipitation Data Year 2:", precip_2)
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

        ax1.legend(loc='upper left')
        ax2.legend(loc='upper right')

        plt.xticks(range(1, 13), months)
        plt.title(f'Climograph Comparison: {year1} vs. {year2}')

        # Save the plot as an image file
        plt.savefig(f'climograph_{year1}_vs_{year2}.png')
    except Exception as e:
        print(f"An error occurred during plotting: {e}")


def compare_data(data, year1, year2):
    print("Aggregated Data:", data)  # Add this line for debugging
    plot_climograph(data, year1, year2)

def load_and_aggregate_data_from_folder(folder_path, years_of_interest):
    aggregated_data = {}
    for year in years_of_interest:
        file_name = f"{year}_weather_data.json"
        file_path = os.path.join(folder_path, file_name)
        if os.path.exists(file_path):
            data = load_data(file_path)
            for month, values in data.items():
                month_key = month if month.startswith(year) else f"{year}-{month}"
                aggregated_data[month_key] = values
    return aggregated_data

def main():
    folder_path = input("Enter the path to the folder containing JSON files: ")
    years = input("Enter the years to process (separated by space, e.g., 1960 1970): ").split()
    print(f"Processing years: {years}")
    aggregated_data = load_and_aggregate_data_from_folder(folder_path, years)

    if len(years) >= 2:
        compare_data(aggregated_data, years[0], years[1])
    else:
        print("Please enter at least two years for comparison.")

if __name__ == "__main__":
    main()
