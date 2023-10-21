import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateGraph(
  config: {
    column_name: string;
    type: string;
    unit?: string;
  }[][],
) {
  let tempCount = 0;
  let catCount = 0;
  Object.values(config).map((value) => {
    value.map((data) => {
      if (['Numerical'].includes(data?.type)) {
        tempCount++;
      }
      if (['Categorical'].includes(data?.type)) {
        catCount++;
      }
    });
  });

  return tempCount > 1 && catCount === 1 ? 'pie' : 'line';
}

export function parseConfig(
  config: {
    column_name: string;
    type: string;
    unit?: string;
  }[][],
) {
  let xField = '';
  let yField = '';
  Object.values(config).map((value) => {
    value.map((data) => {
      if (xField === '' && ['Temporal', 'Categorical'].includes(data?.type)) {
        xField = data.column_name;
      } else if (yField === '' && ['Numerical'].includes(data?.type)) {
        yField = data.column_name;
      }
    });
  });

  return { xField, yField, graph_type: generateGraph(config) };
}
