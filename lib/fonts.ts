import type {
	NextFont,
	NextFontWithVariable,
} from 'next/dist/compiled/@next/font';
import {
	JetBrains_Mono as FontMono,
	Plus_Jakarta_Sans as FontSans,
	Inter,
} from 'next/font/google';

export const fontSans: NextFontWithVariable = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
});

export const fontMono: NextFontWithVariable = FontMono({
	subsets: ['latin'],
	variable: '--font-mono',
});

export const inter: NextFont = Inter({ subsets: ['latin'] });
