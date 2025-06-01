"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const categories = [
  { id: "men", label: "Men" },
  { id: "women", label: "Women" },
  { id: "accessories", label: "Accessories" },
];

const sizes = [
  { id: "xs", label: "XS" },
  { id: "s", label: "S" },
  { id: "m", label: "M" },
  { id: "l", label: "L" },
  { id: "xl", label: "XL" },
];

const colors = [
  { id: "black", label: "Black" },
  { id: "white", label: "White" },
  { id: "red", label: "Red" },
  { id: "blue", label: "Blue" },
  { id: "green", label: "Green" },
];

export function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 200]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        <Button variant="outline" size="sm" className="w-full">
          Clear All
        </Button>
      </div>

      <Accordion
        type="multiple"
        defaultValue={["price", "categories", "sizes", "colors"]}
        className="w-full"
      >
        <AccordionItem value="price" className="">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent className="py-4">
            <div className="space-y-4">
              <Slider
                defaultValue={[0, 200]}
                max={500}
                step={10}
                onValueChange={(value) => setPriceRange(value as number[])}
              />
              <div className="flex items-center justify-between">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox id={`category-${category.id}`} />
                  <Label
                    htmlFor={`category-${category.id}`}
                    className="text-sm"
                  >
                    {category.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="sizes">
          <AccordionTrigger>Sizes</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {sizes.map((size) => (
                <div key={size.id} className="flex items-center space-x-2">
                  <Checkbox id={`size-${size.id}`} />
                  <Label htmlFor={`size-${size.id}`} className="text-sm">
                    {size.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="colors" className="hidden">
          <AccordionTrigger>Colors</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {colors.map((color) => (
                <div key={color.id} className="flex items-center space-x-2">
                  <Checkbox id={`color-${color.id}`} />
                  <Label htmlFor={`color-${color.id}`} className="text-sm">
                    {color.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
