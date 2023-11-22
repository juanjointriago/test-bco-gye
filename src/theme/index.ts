import { MantineThemeOverride } from "@mantine/core";
import { Tuple, DefaultMantineColor } from '@mantine/core';

type ExtendedCustomColors = 'primaryColorName' | 'secondaryColorName' | DefaultMantineColor;

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
  }
}

declare module '@mantine/core' {
  export interface MantineThemeOther {
    colors: {
      primary: string;
      secondary: string;
    }
  }
}

export const theme: MantineThemeOverride = {
  colorScheme: 'light',
  colors: {
    brand: ['#DFA0A7', '#DFC399', '#2f1717', '#7F7777', '#E5E5E5', '#311718', '#55372B', '#83583C', '#B7874C', '#D1BD5E'],
  },
  primaryColor: 'brand',

  shadows: {
    md: '1px 1px 3px rgba(0, 0, 0, .25)',
    xl: '5px 5px 3px rgba(0, 0, 0, .25)',
  },

  headings: {
    fontFamily: 'Roboto, sans-serif',
    sizes: {
      h1: { fontSize: '2rem' },
    },
  },

  other: {
    colors: {
      primary: '#83583C',
      secondary: '#E5E5E5',
    }
  }
}
