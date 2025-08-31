"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function MarketplaceFilters() {
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const categories = [
    { id: "development", label: "Development Tools", count: 12 },
    { id: "design", label: "Design Software", count: 8 },
    { id: "productivity", label: "Productivity", count: 15 },
    { id: "security", label: "Security Tools", count: 6 },
    { id: "database", label: "Database Tools", count: 4 },
  ];

  const features = [
    { id: "cloud", label: "Cloud Integration" },
    { id: "ai", label: "AI-Powered" },
    { id: "collaboration", label: "Team Collaboration" },
    { id: "mobile", label: "Mobile Support" },
    { id: "api", label: "API Access" },
  ];

  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const toggleFeature = (featureId) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId],
    );
  };

  const clearAllFilters = () => {
    setPriceRange([0, 200]);
    setSelectedCategories([]);
    setSelectedFeatures([]);
  };

  const activeFiltersCount =
    selectedCategories.length +
    selectedFeatures.length +
    (priceRange[1] < 200 ? 1 : 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs"
          >
            Clear All ({activeFiltersCount})
          </Button>
        )}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={200}
            step={5}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}+</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => toggleCategory(category.id)}
                />
                <label
                  htmlFor={category.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category.label}
                </label>
              </div>
              <Badge variant="secondary" className="text-xs">
                {category.count}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {features.map((feature) => (
            <div key={feature.id} className="flex items-center space-x-2">
              <Checkbox
                id={feature.id}
                checked={selectedFeatures.includes(feature.id)}
                onCheckedChange={() => toggleFeature(feature.id)}
              />
              <label
                htmlFor={feature.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {feature.label}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {(selectedCategories.length > 0 || selectedFeatures.length > 0) && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Active Filters</h4>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((categoryId) => {
              const category = categories.find((c) => c.id === categoryId);
              return (
                <Badge key={categoryId} variant="secondary" className="gap-1">
                  {category?.label}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 w-3 h-3"
                    onClick={() => toggleCategory(categoryId)}
                  >
                    <X className="w-2 h-2" />
                  </Button>
                </Badge>
              );
            })}
            {selectedFeatures.map((featureId) => {
              const feature = features.find((f) => f.id === featureId);
              return (
                <Badge key={featureId} variant="secondary" className="gap-1">
                  {feature?.label}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 w-3 h-3"
                    onClick={() => toggleFeature(featureId)}
                  >
                    <X className="w-2 h-2" />
                  </Button>
                </Badge>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
