'use client';

import type { IconButtonProps, SpanProps } from '@chakra-ui/react';
import { ClientOnly, IconButton, Skeleton, Span } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';
import * as React from 'react';
import { LuSun } from 'react-icons/lu';

export type ColorModeProviderProps = ThemeProviderProps;

export function ColorModeProvider(props: ColorModeProviderProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      forcedTheme="light"
      enableSystem={false}
      disableTransitionOnChange
      {...props}
    />
  );
}

export type ColorMode = 'light' | 'dark';

export interface UseColorModeReturn {
  colorMode: ColorMode;
  setColorMode: (colorMode: ColorMode) => void;
  toggleColorMode: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useColorMode(): UseColorModeReturn {
  return {
    colorMode: 'light',
    setColorMode: () => {},
    toggleColorMode: () => {},
  };
}

// eslint-disable-next-line react-refresh/only-export-components
export function useColorModeValue<T>(light: T, _dark: T) {
  const { colorMode } = useColorMode();
  return colorMode === 'dark' ? _dark : light;
}

export function ColorModeIcon() {
  return <LuSun />;
}

type ColorModeButtonProps = Omit<IconButtonProps, 'aria-label'>;

export const ColorModeButton = React.forwardRef<
  HTMLButtonElement,
  ColorModeButtonProps
>(function ColorModeButton(props, ref) {
  return (
    <ClientOnly fallback={<Skeleton boxSize="9" />}>
      <IconButton
        disabled
        variant="ghost"
        aria-label="Toggle color mode"
        size="sm"
        ref={ref}
        {...props}
        css={{
          _icon: {
            width: '5',
            height: '5',
          },
        }}
      >
        <ColorModeIcon />
      </IconButton>
    </ClientOnly>
  );
});

export const LightMode = React.forwardRef<HTMLSpanElement, SpanProps>(
  function LightMode(props, ref) {
    return (
      <Span
        color="fg"
        display="contents"
        className="chakra-theme light"
        colorPalette="gray"
        colorScheme="light"
        ref={ref}
        {...props}
      />
    );
  }
);

export const DarkMode = React.forwardRef<HTMLSpanElement, SpanProps>(
  function DarkMode(props, ref) {
    return (
      <Span
        color="fg"
        display="contents"
        className="chakra-theme dark"
        colorPalette="gray"
        colorScheme="dark"
        ref={ref}
        {...props}
      />
    );
  }
);
