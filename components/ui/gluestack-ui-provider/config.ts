'use client';
import { vars } from 'nativewind';

export const config = {
  light: vars({
    '--color-primary-0': '204 221 221',  // Very light
'--color-primary-50': '179 204 204',
'--color-primary-100': '153 186 186',
'--color-primary-200': '128 169 169',
'--color-primary-300': '102 151 151',
'--color-primary-400': '64 107 107',
'--color-primary-500': '26 54 54',   // Base color
'--color-primary-600': '20 43 43',
'--color-primary-700': '16 35 35',
'--color-primary-800': '13 27 27',
'--color-primary-900': '10 20 20',   // Deep shade
'--color-primary-950': '8 15 15',    // Deepest shade

/* Secondary */
'--color-secondary-0': '214 189 152',   // Light neutral tone (matches primary light)
'--color-secondary-50': '182 158 121',   // Soft tan/earthy neutral
'--color-secondary-100': '155 134 102',  // Muted olive brown
'--color-secondary-200': '128 109 79',   // Light brown neutral
'--color-secondary-300': '112 95 70',    // Medium neutral
'--color-secondary-400': '94 81 60',     // Subtle earthy brown
'--color-secondary-500': '82 70 52',     // Strong brownish green
'--color-secondary-600': '72 62 46',     // Darker earthy tone
'--color-secondary-700': '60 52 38',     // Deep brownish green
'--color-secondary-800': '52 44 33',     // Darker neutral
'--color-secondary-900': '44 37 28',     // Deepest brown for contrast
'--color-secondary-950': '38 32 24',     // Deepest neutral accent


    /* Tertiary */
'--color-tertiary-0': '103 125 106',    // Soft greenish beige (complementary to primary)
'--color-tertiary-50': '90 112 94',     // Lighter olive tone
'--color-tertiary-100': '77 94 79',     // Soft green olive
'--color-tertiary-200': '64 79 64',     // Subtle green-brown tone
'--color-tertiary-300': '54 66 55',     // Muted greenish brown
'--color-tertiary-400': '46 56 46',     // Slightly darker green
'--color-tertiary-500': '39 48 40',     // Deep muted green
'--color-tertiary-600': '33 41 34',     // Deeper earthy green
'--color-tertiary-700': '28 34 28',     // Very deep earthy tone
'--color-tertiary-800': '23 29 23',     // Deepest earthy green
'--color-tertiary-900': '19 24 19',     // Deep forest green
'--color-tertiary-950': '16 20 16',     // Very dark green accent


    /* Error */
    '--color-error-0': '254 233 233',
    '--color-error-50': '254 226 226',
    '--color-error-100': '254 202 202',
    '--color-error-200': '252 165 165',
    '--color-error-300': '248 113 113',
    '--color-error-400': '239 68 68',
    '--color-error-500': '230 53 53',
    '--color-error-600': '220 38 38',
    '--color-error-700': '185 28 28',
    '--color-error-800': '153 27 27',
    '--color-error-900': '127 29 29',
    '--color-error-950': '83 19 19',

    /* Success */
    '--color-success-0': '228 255 244',
    '--color-success-50': '202 255 232',
    '--color-success-100': '162 241 192',
    '--color-success-200': '132 211 162',
    '--color-success-300': '102 181 132',
    '--color-success-400': '72 151 102',
    '--color-success-500': '52 131 82',
    '--color-success-600': '42 121 72',
    '--color-success-700': '32 111 62',
    '--color-success-800': '22 101 52',
    '--color-success-900': '20 83 45',
    '--color-success-950': '27 50 36',

    /* Warning */
    '--color-warning-0': '255 249 245',
    '--color-warning-50': '255 244 236',
    '--color-warning-100': '255 231 213',
    '--color-warning-200': '254 205 170',
    '--color-warning-300': '253 173 116',
    '--color-warning-400': '251 149 75',
    '--color-warning-500': '231 120 40',
    '--color-warning-600': '215 108 31',
    '--color-warning-700': '180 90 26',
    '--color-warning-800': '130 68 23',
    '--color-warning-900': '108 56 19',
    '--color-warning-950': '84 45 18',

    /* Info */
    '--color-info-0': '236 248 254',
    '--color-info-50': '199 235 252',
    '--color-info-100': '162 221 250',
    '--color-info-200': '124 207 248',
    '--color-info-300': '87 194 246',
    '--color-info-400': '50 180 244',
    '--color-info-500': '13 166 242',
    '--color-info-600': '11 141 205',
    '--color-info-700': '9 115 168',
    '--color-info-800': '7 90 131',
    '--color-info-900': '5 64 93',
    '--color-info-950': '3 38 56',

    /* Typography */
'--color-typography-0': '214 189 152',   // Lightest (for light text on dark backgrounds)
'--color-typography-50': '103 125 106',   // Light shade
'--color-typography-100': '64 83 76',     // Light-medium shade
'--color-typography-200': '103 125 106',  // Medium light shade
'--color-typography-300': '128 169 169',  // Neutral medium tone
'--color-typography-400': '179 204 204',  // Medium-dark shade
'--color-typography-500': '26 54 54',     // Base (dark text)
'--color-typography-600': '20 43 43',     // Darker tone
'--color-typography-700': '16 35 35',     // Darker shade
'--color-typography-800': '13 27 27',     // Very dark tone
'--color-typography-900': '10 20 20',     // Deepest shade (for headings)
'--color-typography-950': '8 15 15',      // Deepest dark for accents


/* Outline */
'--color-outline-0': '253 254 254',   // Lightest neutral tone
'--color-outline-50': '243 243 243',  // Very light gray
'--color-outline-100': '230 230 230', // Light gray for subtle outlines
'--color-outline-200': '221 220 219', // Soft grayish shade
'--color-outline-300': '211 211 211', // Neutral gray
'--color-outline-400': '165 163 163', // Medium gray
'--color-outline-500': '140 141 141', // Neutral gray
'--color-outline-600': '115 116 116', // Slightly darker gray
'--color-outline-700': '83 82 82',    // Darker gray outline
'--color-outline-800': '65 65 65',    // Very dark gray
'--color-outline-900': '39 38 36',    // Deepest gray
'--color-outline-950': '26 23 23',    // Very dark gray accent

/* Background */
'--color-background-0': '255 255 255',   // White for background
'--color-background-50': '246 246 246',  // Very light background shade
'--color-background-100': '242 241 241', // Soft off-white background
'--color-background-200': '220 219 219', // Light gray
'--color-background-300': '213 212 212', // Subtle gray for soft contrast
'--color-background-400': '162 163 163', // Medium neutral gray
'--color-background-500': '142 142 142', // Muted background
'--color-background-600': '116 116 116', // Darker background
'--color-background-700': '83 82 82',    // Dark gray
'--color-background-800': '65 64 64',    // Deeper gray for background elements
'--color-background-900': '39 38 37',    // Dark gray for darker elements
'--color-background-950': '18 18 18',    // Very dark background


/* Background Special */
'--color-background-error': '254 241 241',  // Light red for error
'--color-background-warning': '255 243 234', // Light yellowish for warnings
'--color-background-success': '237 252 242', // Soft green for success
'--color-background-muted': '247 248 247',  // Muted background for disabled items
'--color-background-info': '235 248 254',   // Light blue for info messages

/* Focus Ring Indicator */
'--color-indicator-primary': '55 55 55',    // Deep dark ring for primary focus
'--color-indicator-info': '83 153 236',     // Blue ring for info focus
'--color-indicator-error': '185 28 28',     // Red ring for error focus
  }),
  dark: vars({
    /* Primary */
'--color-primary-0': '26 54 54',    // Darkest shade (base color)
'--color-primary-50': '38 65 64',   // Slightly lighter shade
'--color-primary-100': '50 76 75',  // Lighter shade
'--color-primary-200': '64 87 86',  // Lightened further
'--color-primary-300': '79 98 97',  // Medium tone
'--color-primary-400': '93 109 108',// Light medium tone
'--color-primary-500': '103 125 106',// Lighter shade (still close to base)
'--color-primary-600': '118 140 121',// Lightened further
'--color-primary-700': '133 155 136',// Light grayish tone
'--color-primary-800': '147 169 150',// Lighter tone
'--color-primary-900': '162 183 163',// Lightest primary shade
'--color-primary-950': '171 192 173',// Very light tone


/* Secondary */
'--color-secondary-0': '20 20 20',   // Very dark
'--color-secondary-50': '23 23 23',  // Dark
'--color-secondary-100': '31 31 31', // Very dark gray
'--color-secondary-200': '39 39 39', // Darker gray
'--color-secondary-300': '44 44 44', // Medium dark gray
'--color-secondary-400': '56 57 57', // Soft dark gray
'--color-secondary-500': '63 64 64', // Grayish
'--color-secondary-600': '86 86 86', // Neutral gray
'--color-secondary-700': '110 110 110', // Light gray
'--color-secondary-800': '135 135 135', // Lighter gray
'--color-secondary-900': '150 150 150', // Almost medium gray
'--color-secondary-950': '164 164 164', // Very light gray


/* Tertiary */
'--color-tertiary-0': '84 49 18',    // Dark brownish shade
'--color-tertiary-50': '108 61 19',  // Darker brownish tone
'--color-tertiary-100': '130 73 23', // Brownish with a hint of orange
'--color-tertiary-200': '180 98 26', // Warm brown with yellowish tint
'--color-tertiary-300': '215 117 31',// Slightly lighter orange-brown
'--color-tertiary-400': '231 129 40',// Rich orange tone
'--color-tertiary-500': '251 157 75',// Bright orange
'--color-tertiary-600': '253 180 116',// Lighter orange
'--color-tertiary-700': '254 209 170',// Soft orange pastel
'--color-tertiary-800': '255 233 213',// Light peachy shade
'--color-tertiary-900': '255 242 229',// Very light peach
'--color-tertiary-950': '255 250 245',// Softest peach tone


    /* Error */
    '--color-error-0': '83 19 19',
    '--color-error-50': '127 29 29',
    '--color-error-100': '153 27 27',
    '--color-error-200': '185 28 28',
    '--color-error-300': '220 38 38',
    '--color-error-400': '230 53 53',
    '--color-error-500': '239 68 68',
    '--color-error-600': '249 97 96',
    '--color-error-700': '229 91 90',
    '--color-error-800': '254 202 202',
    '--color-error-900': '254 226 226',
    '--color-error-950': '254 233 233',

    /* Success */
    '--color-success-0': '27 50 36',
    '--color-success-50': '20 83 45',
    '--color-success-100': '22 101 52',
    '--color-success-200': '32 111 62',
    '--color-success-300': '42 121 72',
    '--color-success-400': '52 131 82',
    '--color-success-500': '72 151 102',
    '--color-success-600': '102 181 132',
    '--color-success-700': '132 211 162',
    '--color-success-800': '162 241 192',
    '--color-success-900': '202 255 232',
    '--color-success-950': '228 255 244',

    /* Warning */
    '--color-warning-0': '84 45 18',
    '--color-warning-50': '108 56 19',
    '--color-warning-100': '130 68 23',
    '--color-warning-200': '180 90 26',
    '--color-warning-300': '215 108 31',
    '--color-warning-400': '231 120 40',
    '--color-warning-500': '251 149 75',
    '--color-warning-600': '253 173 116',
    '--color-warning-700': '254 205 170',
    '--color-warning-800': '255 231 213',
    '--color-warning-900': '255 244 237',
    '--color-warning-950': '255 249 245',

    /* Info */
    '--color-info-0': '3 38 56',
    '--color-info-50': '5 64 93',
    '--color-info-100': '7 90 131',
    '--color-info-200': '9 115 168',
    '--color-info-300': '11 141 205',
    '--color-info-400': '13 166 242',
    '--color-info-500': '50 180 244',
    '--color-info-600': '87 194 246',
    '--color-info-700': '124 207 248',
    '--color-info-800': '162 221 250',
    '--color-info-900': '199 235 252',
    '--color-info-950': '236 248 254',

    /* Typography */
'--color-typography-0': '23 23 23',     // Deepest dark for main text
'--color-typography-50': '38 38 39',    // Slightly lighter dark
'--color-typography-100': '64 64 64',   // Dark gray
'--color-typography-200': '82 82 82',   // Medium dark gray
'--color-typography-300': '115 115 115',// Lighter dark gray
'--color-typography-400': '140 140 140',// Soft gray
'--color-typography-500': '163 163 163',// Light gray
'--color-typography-600': '212 212 212',// Almost white gray
'--color-typography-700': '219 219 220',// Lightest gray
'--color-typography-800': '229 229 229',// Very light gray
'--color-typography-900': '245 245 245',// Almost white
'--color-typography-950': '254 254 255',// White

/* Outline */
'--color-outline-0': '26 23 23',       // Deepest dark for outlines
'--color-outline-50': '39 38 36',      // Dark gray outline
'--color-outline-100': '65 65 65',     // Medium dark gray
'--color-outline-200': '83 82 82',     // Light medium dark gray
'--color-outline-300': '115 116 116',  // Medium gray outline
'--color-outline-400': '140 141 141',  // Soft gray outline
'--color-outline-500': '165 163 163',  // Light gray outline
'--color-outline-600': '211 211 211',  // Almost white gray outline
'--color-outline-700': '221 220 219',  // Very light gray outline
'--color-outline-800': '230 230 230',  // Lighter gray outline
'--color-outline-900': '243 243 243',  // Lightest gray outline
'--color-outline-950': '253 254 254',  // Near white outline


/* Background */
'--color-background-0': '18 18 18',    // Deepest dark background
'--color-background-50': '39 38 37',   // Very dark background
'--color-background-100': '65 64 64',  // Dark gray background
'--color-background-200': '83 82 82',  // Medium dark gray background
'--color-background-300': '116 116 116',// Gray background
'--color-background-400': '142 142 142',// Soft gray background
'--color-background-500': '162 163 163',// Lighter gray background
'--color-background-600': '213 212 212',// Almost white background
'--color-background-700': '229 228 228',// Very light gray background
'--color-background-800': '242 241 241',// Light background
'--color-background-900': '246 246 246',// Almost white background
'--color-background-950': '255 255 255',// White background


/* Background Special */
'--color-background-error': '66 43 43',    // Dark error background
'--color-background-warning': '65 47 35',  // Dark warning background
'--color-background-success': '28 43 33',  // Dark success background
'--color-background-muted': '51 51 51',    // Dark muted background
'--color-background-info': '26 40 46',     // Dark info background


/* Focus Ring Indicator */
'--color-indicator-primary': '247 247 247',  // Light indicator color
'--color-indicator-info': '161 199 245',     // Soft blue for info
'--color-indicator-error': '232 70 69',      // Red for error

  }),
};
