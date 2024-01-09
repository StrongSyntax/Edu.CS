import tkinter as tk
from PIL import Image, ImageDraw, ImageFont
import random
import time

class NameFlasher:
    def __init__(self, root, file_path, image_path, speed=1):
        self.root = root
        self.root.title("Name Flasher")
        self.root.geometry("{0}x{1}+0+0".format(self.root.winfo_screenwidth(), self.root.winfo_screenheight()))
        self.root.attributes('-fullscreen', True)
        self.root.configure(bg='#000000')

        self.original_image_path = image_path
        self.image = Image.open(self.original_image_path)
        self.image = self.image.resize((self.root.winfo_screenwidth(), self.root.winfo_screenheight()))

        self.canvas = tk.Canvas(self.root, bg="black", width=self.root.winfo_screenwidth(), height=self.root.winfo_screenheight(), highlightthickness=0)
        self.canvas.pack()

        self.names = self.load_names_from_file(file_path)

        self.speed_var = tk.DoubleVar()
        self.speed_var.set(speed)

        self.speed_slider = tk.Scale(self.root, from_=0.1, to=500, orient="horizontal", variable=self.speed_var, length=200, label="Speed", bg='#000000', fg='#FFFFFF')
        self.speed_slider.pack(pady=10)

    def load_names_from_file(self, file_path):
        try:
            with open(file_path, 'r') as file:
                lines = file.readlines()

            names = [line.strip() for line in lines if line.strip()]
            return names
        except Exception as e:
            print(f"Error loading names from file: {e}")
            return []

    def get_dominant_color(self, x, y):
        pixel = self.image.getpixel((x, y))
        return "#{:02x}{:02x}{:02x}".format(pixel[0], pixel[1], pixel[2])

    def create_names(self):
        generated_image = Image.new("RGBA", (self.root.winfo_screenwidth(), self.root.winfo_screenheight()), (0, 0, 0, 0))
        draw = ImageDraw.Draw(generated_image)
        font = ImageFont.load_default()

        for name in self.names:
            x_pos = random.randint(0, self.root.winfo_screenwidth() - 100)
            y_pos = random.randint(0, self.root.winfo_screenheight() - 30)

            label_color = self.get_dominant_color(x_pos, y_pos)

            # Draw text on the Canvas with transparent background
            label_text = self.canvas.create_text(x_pos, y_pos, text=name, font=("Arial", 5, "bold"), fill=label_color)

            self.root.update()
            time.sleep(0.1 / self.speed_var.get())

            # Draw text on the generated image with transparent background and label color
            draw.text((x_pos, y_pos), name, font=font, fill=label_color)

        # Save the generated image
        generated_image_path = "C:\\Users\\DMone\\OneDrive\\Desktop\\All naming project\\python data tools i made\\generated_image.png"
        generated_image.save(generated_image_path)

        # Calculate accuracy
        accuracy_percentage = self.calculate_accuracy(generated_image_path)
        print(f"Accuracy: {accuracy_percentage:.2f}%")

    def calculate_accuracy(self, generated_image_path):
        original_image = Image.open(self.original_image_path)
        generated_image = Image.open(generated_image_path)

        original_pixels = original_image.convert("RGBA").getdata()
        generated_pixels = generated_image.convert("RGBA").getdata()

        correct_pixels = 0
        total_pixels = 0

        for original_pixel, generated_pixel in zip(original_pixels, generated_pixels):
            if original_pixel[3] != 0:  # Ignore transparency in the original image
                total_pixels += 1
                if original_pixel[:3] == generated_pixel[:3]:
                    correct_pixels += 1

        return (correct_pixels / total_pixels) * 100 if total_pixels != 0 else 100  # Prevent division by zero

if __name__ == "__main__":
    imageInput = input("Insert The Path To Your Desired Image: ")
    root = tk.Tk()
    flasher = NameFlasher(root, "C:\\Users\\DMone\\OneDrive\\Desktop\\All naming project\\python data tools i made\\input.txt", imageInput, speed=350)

    while True:
        flasher.create_names()

        # Prompt user to continue
        continue_prompt = input("Continue? (y/n): ")
        if continue_prompt.lower() != 'y':
            break

    root.mainloop()
