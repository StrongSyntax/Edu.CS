from collections import Counter
import os

def is_valid_name(name):
    # Check if a name is valid (doesn't contain periods or question marks) and is not a single character
    return '.' not in name and '?' not in name and len(name) > 1

def extract_stats(file_path, output_file_path=None):
    # Initialize counters for statistics
    all_names = []
    first_names = []
    last_names = []
    decades = []

    # Read the file
    with open(file_path, 'r') as file:
        current_year = None

        for line in file:
            line = line.strip()

            if line.endswith(':'):
                # Found a year, update current_year
                current_year = int(line[:-1])
            elif line and len(line.split()) >= 2:
                # Found a name with at least two parts (first and last names)
                names = line.split()
                first_name = names[0]
                last_name = names[-1]

                # Skip names with periods, question marks, or are single characters
                if is_valid_name(first_name) and is_valid_name(last_name):
                    first_names.append(first_name)
                    last_names.append(last_name)
                    all_names.append(line)
                    if current_year is not None:
                        decade = current_year - (current_year % 10)
                        decades.append(decade)

    # Count occurrences of each name
    first_name_counts = Counter(first_names)
    last_name_counts = Counter(last_names)
    all_name_counts = Counter(all_names)
    decade_counts = Counter(decades)

    # Set default output file path to the script directory
    if output_file_path is None:
        script_directory = os.path.dirname(os.path.realpath(__file__))
        output_file_path = os.path.join(script_directory, 'output_stats.txt')

    # Open output file for writing
    with open(output_file_path, 'w') as output_file:
        # Write overall statistics to the file
        output_file.write(f"Number of unique first names: {len(set(first_names))}\n")
        output_file.write(f"Number of unique last names: {len(set(last_names))}\n")
        output_file.write(f"Number of unique total names: {len(set(all_names))}\n")
        output_file.write(f"Number of first names appearing only once: {sum(count == 1 for count in first_name_counts.values())}\n")
        output_file.write(f"Number of last names appearing only once: {sum(count == 1 for count in last_name_counts.values())}\n")
        output_file.write(f"Number of full names appearing only once: {sum(count == 1 for count in all_name_counts.values())}\n\n")

        output_file.write("Most common first names:\n")
        for name, count in first_name_counts.most_common(5):
            output_file.write(f"{name}: {count}\n")
        output_file.write("\nLeast common first names:\n")
        for name, count in first_name_counts.most_common()[:-6:-1]:
            output_file.write(f"{name}: {count}\n")

        output_file.write("\nMost common last names:\n")
        for name, count in last_name_counts.most_common(5):
            output_file.write(f"{name}: {count}\n")
        output_file.write("\nLeast common last names:\n")
        for name, count in last_name_counts.most_common()[:-6:-1]:
            output_file.write(f"{name}: {count}\n")

        output_file.write("\nMost common full names:\n")
        for name, count in all_name_counts.most_common(5):
            output_file.write(f"{name}: {count}\n")
        output_file.write("\nLeast common full names:\n")
        for name, count in all_name_counts.most_common()[:-6:-1]:
            output_file.write(f"{name}: {count}\n")

        # Write statistics by decade to the file
        output_file.write("\nStats per Decade:\n")
        for decade, count in decade_counts.most_common():
            output_file.write(f"\nDecade: {decade}s\n")
            names_for_decade = [name for name, d in zip(all_names, decades) if d == decade]
            counts_for_decade = Counter(names_for_decade)

            output_file.write("\nMost common first names:\n")
            for name, count in Counter([n.split()[0] for n in names_for_decade if is_valid_name(n.split()[0])]).most_common(5):
                output_file.write(f"{name}: {count}\n")
            output_file.write("\nLeast common first names:\n")
            for name, count in Counter([n.split()[0] for n in names_for_decade if is_valid_name(n.split()[0])]).most_common()[:-6:-1]:
                output_file.write(f"{name}: {count}\n")

            output_file.write("\nMost common last names:\n")
            for name, count in Counter([n.split()[-1] for n in names_for_decade if is_valid_name(n.split()[-1])]).most_common(5):
                output_file.write(f"{name}: {count}\n")
            output_file.write("\nLeast common last names:\n")
            for name, count in Counter([n.split()[-1] for n in names_for_decade if is_valid_name(n.split()[-1])]).most_common()[:-6:-1]:
                output_file.write(f"{name}: {count}\n")

            output_file.write("\nMost common full names:\n")
            for name, count in counts_for_decade.most_common(5):
                output_file.write(f"{name}: {count}\n")
            output_file.write("\nLeast common full names:\n")
            for name, count in counts_for_decade.most_common()[:-6:-1]:
                output_file.write(f"{name}: {count}\n")

            # Most likely and least likely names based on most and least popular first and last names
            most_popular_first = Counter([n.split()[0] for n in names_for_decade if is_valid_name(n.split()[0])]).most_common(1)[0][0]
            most_popular_last = Counter([n.split()[-1] for n in names_for_decade if is_valid_name(n.split()[-1])]).most_common(1)[0][0]
            most_likely_name = f"{most_popular_first} {most_popular_last}"
            output_file.write(f"\nMost likely name: {most_likely_name}\n")

            least_popular_first = Counter([n.split()[0] for n in names_for_decade if is_valid_name(n.split()[0])]).most_common()[:-6:-1][-1][0]
            least_popular_last = Counter([n.split()[-1] for n in names_for_decade if is_valid_name(n.split()[-1])]).most_common()[:-6:-1][-1][0]
            least_likely_name = f"{least_popular_first} {least_popular_last}"
            output_file.write(f"Least likely name: {least_likely_name}\n")

# Prompt for file path
file_path = input("Enter the path to the text file: ").strip('\"')

# Prompt for output file path or use the default path
output_file_path = input("Enter the path for the output file (press Enter for default path): ").strip('\"') or None

extract_stats(file_path, output_file_path)
