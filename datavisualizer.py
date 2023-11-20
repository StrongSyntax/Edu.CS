import matplotlib.pyplot as plt
from wordcloud import WordCloud
import random
import os

def generate_visualization(names, name_type, visualization_type, include_full_name=False, year_range=None, output_file='visualization.png', weights_file='weights.txt'):
    # Remove double quotes from the file path
    names = names.strip('\"')

    # Read the names from the file
    with open(names, 'r') as file:
        lines = file.readlines()

    # Prompt the user for options
    if not include_full_name:
        name_type = input("Enter 'first' or 'last' for name type: ").lower()

    year_range_input = input("Enter year range (e.g., '1970-1976'), or press Enter for all years: ")

    # Convert year_range_input to a tuple if not empty
    year_range = tuple(map(int, year_range_input.split('-'))) if year_range_input else None

    # Extract names and filter by years
    selected_names = []
    current_year = None

    for line in lines:
        # Check if the line represents a year
        if line.strip().endswith(':'):
            current_year = int(line.strip()[:-1])
            continue

        parts = line.strip().split()

        # Check if the line has the expected number of parts
        if len(parts) < 2:
            print(f"Skipping line: {line.strip()} - Insufficient information.")
            continue

        graduation_year = current_year
        first_name, last_name = parts[0], parts[1]

        # Combine hyphenated names
        if len(parts) > 2:
            for i in range(2, len(parts)):
                if '-' in parts[i]:
                    last_name += f"-{parts[i]}"
                else:
                    break

        full_name = f"{first_name} {last_name}"

        if name_type == 'full' or (name_type == 'first' and include_full_name):
            selected_names.append(full_name)
        elif name_type == 'first':
            selected_names.append(first_name)
        elif name_type == 'last':
            selected_names.append(last_name)

        if year_range is None or year_range[0] <= graduation_year <= year_range[1]:
            selected_names.append(full_name if name_type == 'full' or include_full_name else first_name if name_type == 'first' else last_name)

    # Check if there are names to visualize
    if not selected_names:
        print("No names found for the selected criteria.")
        return

    # Create a string with the selected names
    text = ' '.join(selected_names)

    # Choose between word cloud, bar graph, and pie chart
    if visualization_type.lower() == 'wordcloud':
        # Function to interpolate colors based on density (generate random colors)
        def interpolate_color(word, font_size, position, orientation, random_state=None, **kwargs):
            # Generate random RGB values
            r = random.randint(0, 255)
            g = random.randint(0, 255)
            b = random.randint(0, 255)
            return f"rgb({r},{g},{b})"

        # Generate the word cloud with custom color function and set max_words=None
        wordcloud = WordCloud(width=800, height=400, background_color='white', max_words=None, collocations=False, color_func=interpolate_color).generate(text)

        # Display the word cloud using matplotlib
        plt.figure(figsize=(10, 5))
        plt.imshow(wordcloud, interpolation='bilinear')
        plt.axis('off')

        # Save the word cloud as a PNG file in 4K resolution
        plt.savefig(output_file, bbox_inches='tight', dpi=600)

        # Save the weights to a text file
        with open(weights_file, 'w') as weights_file:
            weights_file.write(str(wordcloud.words_))

    elif visualization_type.lower() == 'bargraph':
        # Count the occurrences of each name
        name_counts = {}
        for name in selected_names:
            if name in name_counts:
                name_counts[name] += 1
            else:
                name_counts[name] = 1

        # Convert the dictionary to lists for plotting
        names_list = list(name_counts.keys())
        counts_list = list(name_counts.values())

        # Generate random colors for the bars
        colors = [f'#{random.randint(0, 0xFFFFFF):06x}' for _ in range(len(names_list))]

        # Print the randomized colors to the console
        print("Randomized Colors:", colors)

        # Calculate the required spacing based on the number of names
        spacing = max(0.5, 1.0 / len(names_list))  # Set a minimum spacing

        # Plot the horizontal bar graph with wider bars and random colors
        for i, (name, count) in enumerate(zip(names_list, counts_list)):
            plt.barh(name, count, color=colors[i], height=spacing, align='center')

        # Add labels and title
        plt.xlabel('Frequency')
        plt.title('Frequency of ' + name_type.capitalize() + ' Names')

        # Set the hspace to 4
        plt.subplots_adjust(hspace=4)

        # Save the horizontal bar graph as a PNG file in 4K resolution
        plt.savefig(output_file, bbox_inches='tight', dpi=300)

        # Save the counts to a text file
        with open(weights_file, 'w') as weights_file:
            for name, count in zip(names_list, counts_list):
                weights_file.write(f"{name}: {count}\n")

    elif visualization_type.lower() == 'piechart':
        # Count the occurrences of each name
        name_counts = {}
        for name in selected_names:
            if name in name_counts:
                name_counts[name] += 1
            else:
                name_counts[name] = 1

        # Sort names by count in descending order
        sorted_name_counts = sorted(name_counts.items(), key=lambda x: x[1], reverse=True)

        # Select the top 75 names
        top_names = dict(sorted_name_counts[:75])

        # Calculate the count for the 'Other' category
        other_count = sum(item[1] for item in sorted_name_counts[75:])

        # Create a dictionary for the pie chart
        pie_data = {**top_names, 'Other': other_count}

        # Convert the dictionary to lists for plotting
        names_list = list(pie_data.keys())
        counts_list = list(pie_data.values())

        # Generate random colors for the pie chart, ensuring 'Other' is always black
        colors = [f'#{random.randint(0, 0xFFFFFF):06x}' if name != 'Other' else '#474747' for name in names_list]

        # Print the randomized colors to the console
        print("Randomized Colors:", colors)

        # Plot the pie chart without exploding and without text labels
        wedges, texts, autotexts = plt.pie(counts_list, labels=None, autopct='', startangle=140, wedgeprops=dict(width=0.4), pctdistance=0.85, radius=1.2, counterclock=False, explode=[0] * len(names_list), colors=colors)

        # Add title
        plt.title('Distribution of ' + name_type.capitalize() + ' Names (Top 75)')

        # Add legend on the side with names, colors, percentages, and counts
        legend_labels = [f'{name}: {count/sum(counts_list)*100:.1f}% ({count})' for name, count in zip(names_list, counts_list)]
        plt.legend(wedges, legend_labels, loc='center left', bbox_to_anchor=(1, 0.5), title='Names', fancybox=True, shadow=True, title_fontsize='12')

        # Save the pie chart as a PNG file in 4K resolution
        plt.savefig(output_file, bbox_inches='tight', dpi=300)

        # Save the counts to a text file
        with open(weights_file, 'w') as weights_file:
            for name, count in zip(names_list, counts_list):
                weights_file.write(f"{name}: {count}\n")

    else:
        print("Invalid visualization type. Please choose 'wordcloud', 'bargraph', or 'piechart'.")
        return

    # Show the visualization
    plt.show()

# Prompt the user for the path of the text file
file_path = input("Enter the path of the text file: ")

# Prompt the user for 'wordcloud', 'bargraph', or 'piechart' for visualization type
visualization_type = input("Enter 'wordcloud', 'bargraph', or 'piechart' for visualization type: ")

# Prompt the user for including full name
include_full_name = input("Include both first and last names? (y/n): ").lower() == 'y'

# Example usage:
# The program will prompt the user for 'first' or 'last' for name type
# The program will prompt the user for including both first and last names
# The program will prompt the user for a range of years or press Enter for all years
# The program will prompt the user for 'wordcloud', 'bargraph', or 'piechart' for visualization type
# The visualization will be saved in 'visualization.png', change it as needed
# The weights will be saved in 'weights.txt', change it as needed
generate_visualization(file_path, 'first', visualization_type, include_full_name)
