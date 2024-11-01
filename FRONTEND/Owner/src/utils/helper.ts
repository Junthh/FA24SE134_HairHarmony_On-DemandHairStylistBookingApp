import { ResponseErrorApi } from "models/Response.model";

// Write code to build common functions/methods
export const currencyFormat = (value) => {
    return new Intl.NumberFormat('vi-vn', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
}

export const numberSepartorFormat = (value) => {
    return value.toLocaleString();
}

export const handleError = (error: unknown): string => {
    if (typeof error === 'object') {
        // handle error from response error model in BE
        const errs = ((error as any) as ResponseErrorApi).errors;
        if (errs && errs.length) {
            return errs[0].message as string;
        }

        return 'Unexpected Error!!!';

    }
    return error as string;
}

export const hexToRgba = (hex, opacity = 1) => {
    // Remove the '#' character if present
    hex = hex.replace('#', '');

    // Convert the hexadecimal value to decimal
    const red = parseInt(hex.substring(0, 2), 16);
    const green = parseInt(hex.substring(2, 4), 16);
    const blue = parseInt(hex.substring(4, 6), 16);

    // Return the RGB color value
    return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}

export const getYoutubeId = (youtubeUrl: string): string => {
    if (!youtubeUrl) {
        return '';
    }

    let videoId = null;
    const regex = /[?&]v=([^&#]*)|youtu\.be\/([^&#]*)/;
    const match = youtubeUrl.match(regex);

    if (match && match.length > 1) {
        videoId = match[1] || match[2];
    }

    return videoId;
}

export const fileToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

export function getMimeTypeFromBase64(base64String) {
    const dataPortion = base64String?.split(',')[0];
    const mediaType = dataPortion?.match(/:(.*?);/)[1];
    return mediaType;
}

export const base64ToFile = (url, fileName) => {
    const mimeType = getMimeTypeFromBase64(url) || 'image/png';
    return fetch(url)
        .then(res => res.blob())
        .then(blob => new File([blob], fileName, { type: mimeType }));
}

export const objectToFormData = (obj, form = new FormData(), namespace = '') => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const formKey = namespace ? `${namespace}[${key}]` : key;

      if (obj[key] instanceof File) {
        form.append(formKey, obj[key]);
      } else if (obj[key] instanceof Array) {
        obj[key].forEach((value, index) => {
          const arrayKey = `${formKey}[${index}]`;
          if (value instanceof Object) {
            objectToFormData(value, form, arrayKey);
          } else {
            form.append(arrayKey, value);
          }
        });
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        objectToFormData(obj[key], form, formKey);
      } else {
        form.append(formKey, obj[key]);
      }
    }
  }
  return form;
};
  