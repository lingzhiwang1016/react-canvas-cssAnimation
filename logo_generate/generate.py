#!/usr/bin/env python

from PIL import Image, ImageFilter, ImageEnhance


def isWrite(v):
    if v[0] > 0 or v[1] > 0 or v[2] > 0:
        return True
    return False


imageName = "80";
im = Image.open("data/%s.png" % (imageName))
print("origin", im.format, im.width, im.height, im.mode)

count = 0
for y in range(im.height):
    for x in range(im.width):
        v = im.getpixel((x, y))
        if isWrite(v):
            count += 1

with open("data/%s_w%d_h%d_%d.txt" % (imageName, im.width, im.height, count), 'w') as file:
    for y in range(im.height):
        for x in range(im.width):
            v = im.getpixel((x, y))
            if isWrite(v):
                file.write("1")
            else:
                file.write(".")
        file.write("\n")
