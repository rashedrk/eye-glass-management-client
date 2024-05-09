export const frameMaterial = ['Metal', 'Acetate', 'Plastic', 'Stainless-steel', 'Polycarbonate'];
export const frameShapes = ['Rectangular', 'Round', 'Cat-Eye', 'Square', 'Wayfarer', 'Sports'];
export const color = ['Black', 'Blue', 'Green', 'White', 'Gold', 'Gray', 'Silver'];
export const frameType = ['Full-rim', 'Half-rim', 'Rimless'];
export const frameSize = ['Narrow', 'Medium', 'Wide', 'Large'];
export const lensType = ['Single-Vision', 'Progressive', 'Bifocal'];
export const brands = ['Lenskart', 'John-Jacobs', 'Fossil', 'Ojos'];
export const gender = ['Men', 'Women', 'Unisex'];

export const frameMaterialOptions = frameMaterial.map(item => ({
    label: item,
    text: item,
    value: item.toLowerCase()
}));
export const frameShapesOptions = frameShapes.map(item => ({
    label: item,
    text: item,
    value: item.toLowerCase()
}));
export const colorOptions = color.map(item => ({
    label: item,
    text: item,
    value: item.toLowerCase()
}));
export const frameTypeOptions = frameType.map(item => ({
    label: item,
    text: item,
    value: item.toLowerCase()
}));
export const frameSizeOptions = frameSize.map(item => ({
    label: item,
    text: item,
    value: item.toLowerCase()
}));
export const lensTypeOptions = lensType.map(item => ({
    label: item,
    text: item,
    value: item.toLowerCase()
}));
export const brandsOptions = brands.map(item => ({
    label: item,
    text: item,
    value: item.toLowerCase()
}));
export const genderOptions = gender.map(item => ({
    label: item,
    text: item,
    value: item.toLowerCase()
}));