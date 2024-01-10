# The provided data seems to be daily weather data for the month of January.
# The columns appear to represent:
# - Daily Maximum Temperature (°C)
# - Daily Minimum Temperature (°C)
# - Precipitation (mm)
# - Snowfall (cm)

# Here's the raw data provided
raw_data = """
-11.1 -13.9 0.00 0.0
-11.1 -19.4 0.13 1.3
-10.6 -28.9 0.05 0.5
-2.2 -23.3 0.03 0.3
4.4 -19.4 0.00 0.0
2.8 -1.7 0.00 0.0
-1.7 -10.0 0.00 0.0
-10.6 -16.1 0.00 0.0
-10.0 -20.0 0.00 0.0
-5.6 -13.9 0.00 0.0
-3.3 -16.1 0.00 0.0
-10.6 -20.0 0.00 0.0
-7.8 -19.4 0.00 0.0
-7.8 -15.6 0.00 0.0
1.7 -16.1 0.00 0.0
-10.0 -18.3 0.15 1.5
-11.7 -15.0 0.15 1.5
-17.2 -22.2 0.00 0.0
-8.9 -25.6 0.00 0.0
-9.4 -13.3 0.03 0.3
-16.7 -23.3 0.00 0.0
-17.8 -24.4 0.00 0.0
-16.1 -28.3 0.00 0.0
-12.8 -21.7 0.00 0.0
-16.7 -20.0 0.00 0.0
-13.9 -22.8 0.00 0.0
-15.0 -21.1 0.13 1.3
-8.9 -18.3 0.00 0.0
0.6 -15.6 0.00 0.0
5.6 -8.3 0.00 0.0
3.9 -6.1 0.00 0.0
"""

# Parse the raw data into a structured format (list of lists)
data = []
for line in raw_data.strip().split('\n'):
    if line.strip():  # Check if line is not empty
        data.append(list(map(float, line.split())))

# Now calculate the average for each column
avg_data = [sum(col) / len(col) for col in zip(*data)]

year = input("Enter the year, followed by the month. (YYYY-MM)")

# Convert this average data into the JSON format used previously
json_data = {
    year: {
        "AverageMaxTemperature": avg_data[0],
        "AverageMinTemperature": avg_data[1],
        "AveragePrecipitation": avg_data[2],
        "AverageSnowfall": avg_data[3]
    }
}

json_data
