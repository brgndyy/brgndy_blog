import { FormDataObject } from 'types';
import convertFileNameToSafeFormat from './convertFileNameToSafeFormat';

const appendDataToFormData = (formData: FormData, data: FormDataObject): void => {
  Object.keys(data).forEach((key) => {
    const value = data[key];
    if (value instanceof File) {
      const safeFileName = convertFileNameToSafeFormat(value.name);
      const newFile = new File([value], safeFileName, {
        type: value.type,
      });
      formData.append(key, newFile);
    } else if (
      typeof value === 'string' ||
      typeof value === 'boolean' ||
      typeof value === 'number'
    ) {
      formData.append(key, value.toString());
    } else if (Array.isArray(value)) {
      value.forEach((item) => {
        if (typeof item === 'object' && !(item instanceof File)) {
          formData.append(key, JSON.stringify(item));
        }
      });
    } else {
      formData.append(key, JSON.stringify(value));
    }
  });
};

export default appendDataToFormData;
