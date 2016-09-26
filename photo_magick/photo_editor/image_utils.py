from PIL import Image
from PIL import ImageDraw
from PIL import ImageEnhance
from PIL import ImageFilter
from PIL import ImageFont
from PIL import ImageOps


class ImageProcessor(object):
    """Implements different Image filters"""
    def __init__(
            self, img, operation=None, option=None,
            left=0, upper=0,
            right=0, lower=0
    ):
        self.img = img
        self.operation = operation
        self.option = option
        self.left = float(left)
        self.upper = float(upper)
        self.right = float(right)
        self.lower = float(lower)

    def apply_pil_process_ops(self):
        """
        Applies PIL's 'ready_made' image processing operations

        Args:
            img - the image to process
            operation - PIL operation to apply
        Properties:
            gray_scale - converts image to grayscale
            flip - flip image vertically
            invert - negate the image with PIL's image processor
            mirror - flip image horizontally
            posterize - applies PIL's posterize to supplied image
            solarize - applies PIL's solarize to supplied image
        Returns:
            out - manipulated image
        """
        operations = {
            'gray_scale': ImageOps.grayscale,
            'flip': ImageOps.flip,
            'invert': ImageOps.invert,
            'mirror': ImageOps.mirror,
            'posterize': ImageOps.posterize,
            'solarize': ImageOps.solarize
        }
        if self.operation == 'posterize':
            out = operations[self.operation](self.img, 1)
        else:
            out = operations[self.operation](self.img)
        return out

    def add_watermark(self):
        """Applies watermark to image

        Args:
            img - the image to manipulate
        Returns:
            img - ???
            draw - ???
        """
        text = "ALTAIR"  # TODO: Let user supply text
        draw = ImageDraw.Draw(self.img)
        draw.line((0, 0) + self.img.size, fill=(255, 255, 255))
        draw.line(
            (0, self.img.size[1], self.img.size[0], 0),
            fill=(255, 255, 255)
        )
        font = ImageFont.truetype('/Users/mac/Library/Fonts/ARESSENCE.ttf', 50)
        width, height = font.getsize(text)
        draw.text(
            (self.img.size[0] / 2 - width / 2, self.img.size[1] / 2 + 20),
            text,
            fill=(255, 255, 0),
            font=font
        )
        draw.text(
            (self.img.size[0] / 2 - width / 2, self.img.size[1] / 2 - 60),
            text,
            fill=(255, 255, 0),
            font=font
        )
        # return self.img, draw
        return self.img

    def crop(self):
        """Crop the supplied according to size received

        Args:
            img - the image to manipulate
            left - the lower left of a rectangle
            upper - the upper left of a rectangle
            right - the upper right of a rectangle
            lower - the lower right of a rectangle

        Returns:
            region - the cropped image
        """
        box = (self.left, self.upper, self.right, self.lower)
        region = self.img.crop(box)
        return region

    def enhance_image(self):
        """
        Adjusts the contrast, brightness, sharpness or color of
        images supplied.

        Args:
            img - the image to enhance
            option - determines the new contrast
            operation - the property to adjust
        Returns:
            out - the flipped image
        """
        base = 5.0
        factor = int(self.option) / base
        enhancers = {
            'contrast': ImageEnhance.Contrast,
            'brightness': ImageEnhance.Brightness,
            'sharpness': ImageEnhance.Sharpness,
            'color': ImageEnhance.Color
        }
        out = enhancers[self.operation](self.img)
        out = out.enhance(factor)
        return out

    def filter_image(self):
        """
        Applies PIL's 'ready_made' image processing operations

        Args:
            img - the image to process
            operation - name of filter to apply
        Properties:
            contour - applies PIL's CONTOUR filter to supplied image
            edge_enhance_more - applies PIL's EDGE_ENHANCE_MORE filter
                                to supplied image
            gaussian_blur - applies PIL's GaussianBlur filter to image
            max_filter - applies PIL's MAX_FILTER to supplied image
            unsharp_mask - applies unsharp mask filter to supplied image
        Returns:
            out - filtered image
        """
        filters = {
            'contour': ImageFilter.CONTOUR,
            'edge_enhance_more': ImageFilter.EDGE_ENHANCE_MORE,
            'gaussian_blur': ImageFilter.GaussianBlur,
            'max_filter': ImageFilter.MaxFilter,
            'unsharp_mask': ImageFilter.UnsharpMask
        }
        out = self.img.filter(filters[self.operation])
        return out

    def mix_n_match(self):
        """
        Reposition the supplied image's color channels

        Args:
            img - the image to manipulate
            option - select how colour channels are repositioned in image
        Returns:
            img - an unmodified image
            out - the modified image
        """
        try:
            r, g, b = self.img.split()
            options = {
                '1': (b, g, r), '2': (g, b, r), '3': (g, r, b), '4': (r, b, g)
            }
            out = Image.merge("RGB", options[self.option])
        except ValueError:
            return self.img
        return out

    def resize(self):
        """Resize the image

        Args:
            img - the image to manipulate
            option - dictates by how much image be increased or decreased
        Returns:
            out - the modified image
        """
        xsize, ysize = self.img.size
        sizes = {
            'vsmall': ((xsize // 2), (ysize // 2)),
            'small': ((int(xsize / 1.5)), (int(ysize / 1.5))),
            'medium': ((int(xsize * 1.3)), (int(ysize * 1.3))),
            'large': ((int(xsize * 1.6)), (int(ysize * 1.6)))
        }
        magnitude = sizes[self.option]
        out = self.img.resize(magnitude)
        return out

    def roll(self):
        """Roll an image sideways

        Args:
            img - the image to manipulate
        Returns:
            img - the modified image
        """
        xsize, ysize = self.img.size
        delta = xsize // 2
        delta = delta % xsize

        if delta == 0:
            return self.img

        part1 = self.img.crop((0, 0, delta, ysize))
        part2 = self.img.crop((delta, 0, xsize, ysize))
        part1.load()
        part2.load()
        self.img.paste(part2, (0, 0, xsize - delta, ysize))
        self.img.paste(part1, (xsize - delta, 0, xsize, ysize))
        return self.img

    def rotate(self):
        """Rotate image anti-clockwise

        Args:
            img - the image to manipulate
        Returns:
            out - the modified image
        """
        out = self.img.rotate(90)
        return out
