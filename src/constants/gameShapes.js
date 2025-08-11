// src/constants/gameShapes.js
import { Triangle, Square, Circle, Star } from 'lucide-react'; 

// Define all available shapes
export const SHAPE_DEFINITIONS = [
  { id: 'triangle', name: 'Triangle', icon: Triangle },
  { id: 'square', name: 'Square', icon: Square },
  { id: 'circle', name: 'Circle', icon: Circle },
  { id: 'star', name: 'Star', icon: Star },
];

// Define all available colors
export const COLOR_DEFINITIONS = [
  { id: 'blue', name: 'Blue', tailwindClass: 'text-blue-500' },
  { id: 'green', name: 'Green', tailwindClass: 'text-green-500' },
  { id: 'red', name: 'Red', tailwindClass: 'text-red-500' },
  { id: 'yellow', name: 'Yellow', tailwindClass: 'text-yellow-500' },
];

// Automatically generate all possible shape-color combinations
export const GAME_SHAPES = SHAPE_DEFINITIONS.flatMap(shape => 
  COLOR_DEFINITIONS.map(color => ({
    // Create a unique ID like "triangle-red"
    id: `${shape.id}-${color.id}`,
    // Create a display name like "Red Triangle"
    name: `${color.name} ${shape.name}`,
    // Pass along the icon component
    icon: shape.icon,
    // Pass along the specific color class
    colorClass: color.tailwindClass,
    // Store the base shape and color info for game logic later
    shapeId: shape.id,
    colorId: color.id,
  }))
);