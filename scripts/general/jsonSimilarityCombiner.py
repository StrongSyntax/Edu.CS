import os
import json

def combine_json_files(directory_path, output_file):
    combined_data = {}

    # Loop through all files in the directory
    for filename in os.listdir(directory_path):
        if filename.endswith('.json'):
            file_path = os.path.join(directory_path, filename)
            
            # Read the JSON data from each file
            with open(file_path, 'r') as file:
                data = json.load(file)
                combined_data.update(data)

    # Write the combined data to the output file
    with open(output_file, 'w') as file:
        json.dump(combined_data, file, indent=4)

# Example usage
directory_path = 'C:\Users\DMone\OneDrive\Desktop\KAHSVisualizer\data\conversions'
output_file = 'C:\Users\DMone\OneDrive\Desktop\KAHSVisualizer\data\combined.json'
combine_json_files(directory_path, output_file)
