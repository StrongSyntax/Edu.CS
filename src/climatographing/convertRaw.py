import json
import re

def parse_weather_data(raw_data):
    # Regular expression to identify month headers
    month_header_regex = r"(\w+) (\d{4}) Edmonton Weather"
    # Mapping of month names to their numeric equivalents
    month_mapping = {"January": "01", "February": "02", "March": "03", "April": "04",
                     "May": "05", "June": "06", "July": "07", "August": "08",
                     "September": "09", "October": "10", "November": "11", "December": "12"}

    # Splitting the raw data by month headers
    months_data = re.split(month_header_regex, raw_data)[1:]

    # Processing data for each month
    results = {}
    for i in range(0, len(months_data), 3):
        month_name, year, data = months_data[i], months_data[i + 1], months_data[i + 2]
        month = month_mapping.get(month_name, "00")
        results[f"{year}-{month}"] = process_month_data(data)

    return results

def process_month_data(data):
    month_data = []
    for line in data.split('\n'):
        values = line.split()
        # Check if the line contains numeric data and has at least 3 values (High, Low, Precipitation)
        if values and all(v.replace('.', '', 1).replace('-', '', 1).isdigit() for v in values[-3:]):
            # If snowfall data is missing, add a default value (e.g., 0.0)
            if len(values) < 4:
                values.append("0.0")
            month_data.append([float(v) for v in values[-4:]])

    if not month_data:
        return {"AverageMaxTemperature": 0, "AverageMinTemperature": 0, "AveragePrecipitation": 0, "AverageSnowfall": 0}

    avg_data = [sum(col) / len(col) for col in zip(*month_data)]
    return {
        "AverageMaxTemperature": avg_data[0],
        "AverageMinTemperature": avg_data[1],
        "AveragePrecipitation": avg_data[2],
        "AverageSnowfall": avg_data[3]
    }


def save_to_json(yearly_data, directory_path):
    # Extract year from the first entry
    first_year = next(iter(yearly_data)).split('-')[0]
    # Construct the file name
    file_name = f'{first_year}_weather_data.json'
    full_path = f'{directory_path}\\{file_name}'
    
    with open(full_path, 'w') as file:
        json.dump(yearly_data, file, indent=4)
    return full_path

# Main execution
if __name__ == "__main__":
    raw_data = """January 2024 Edmonton Weather
Day 	High (°C) 	Low (°C) 	Precip. (cm)
January 1
	2.2 	-10.5 	0.00
January 2
	-1.3 	-15.2 	0.00
January 3
	-5.9 	-11.5 	0.00
January 4
	-5.7 	-12.5 	0.04
January 5
	-2.8 	-14.5 	0.00
January 6
	-7.1 	-15.3 	0.00"""
    directory_path = input("Enter the directory path where you want to save the file: ")
    yearly_data = parse_weather_data(raw_data)
    output_file_path = save_to_json(yearly_data, directory_path)
    print(f"Data saved to {output_file_path}")