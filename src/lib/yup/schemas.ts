import * as Yup from 'yup';

export const validationSchemaAlbum = Yup.object({
  artist: Yup.string().required('Artist name is required'),
  featuringArtists: Yup.array(),
  title: Yup.string().required('Title is required'),
  albumYear: Yup.number()
    .typeError('Invalid year')
    .min(1900)
    .max(new Date().getFullYear()),
  rating: Yup.number().min(0).max(5),
  tags: Yup.array(),
  extraInfo: Yup.string(),
  cdsInAlbum: Yup.number()
    .min(1, 'Must be greater than or equal to 1')
    .required('Amout of CDs is required'),
  albumThumbnail: Yup.string(),
  albumFullSize: Yup.string(),
});

export const validationSchemaCd = Yup.object({
  artist: Yup.string().required('Artist name is required'),
  featuringArtists: Yup.array(),
  title: Yup.string().required('Title is required'),
  cdYear: Yup.number()
    .typeError('Invalid year')
    .min(1900)
    .max(new Date().getFullYear()),
  rating: Yup.number().min(0).max(5),
  tags: Yup.array(),
  extraInfo: Yup.string(),
  cdCount: Yup.number()
    .min(1, 'Must be greater than or equal to 1')
    .required('Amount of CDs is required'),
  cdThumbnail: Yup.string(),
  cdFullSize: Yup.string(),
  trackCount: Yup.number()
    .min(1, 'Must be greater than or equal to 1')
    .required('Amout of tracks is required'),
  partOfAlbum: Yup.string(),
});

export const validationSchemaTrack = Yup.object({
  artist: Yup.string().required('Artist name is required'),
  featuringArtists: Yup.array(),
  title: Yup.string().required('Title is required'),
  rating: Yup.number().min(0).max(5),
  tags: Yup.array(),
  extraInfo: Yup.string(),
  cdTitle: Yup.string().required('CD title is required'),
  trackNumber: Yup.number().required('Track number is required'),
  length: Yup.string()
    .matches(/^\d+:\d{1,2}$/, 'Length must be in the format number:number')
    .required('Length is required'),
});
