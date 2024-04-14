# Strapi Provider Upload Supabase

This is a custom provider for Strapi CMS that allows you to use Supabase as a storage provider for your media uploads.

## Installation

To install this package, you can use npm or yarn:

```bash
npm install @low-skilled-developers/strapi-provider-upload-supabase
# or
yarn add @low-skilled-developers/strapi-provider-upload-supabase
```

## Usage

After installing the package, you need to configure it in your Strapi project.

1. Create a new provider configuration in `./config/plugins.ts` or `./config/plugins.js`:

```javascript
module.exports = ({ env }) => ({
  // ...
  upload: {
    provider: 'supabase',
    providerOptions: {
      apiUrl: env('SUPABASE_API_URL'),
      apiKey: env('SUPABASE_API_KEY'),
      bucket: env('SUPABASE_BUCKET'),
    },
  },
});
```

1. Set the environment variables in `.env`:

```bash
SUPABASE_API_URL=your-supabase-api-url
SUPABASE_API_KEY=your-supabase-api-key
SUPABASE_BUCKET=your-supabase-bucket
```

1. Rebuild your Strapi project:

```bash
strapi build
```

Now, you can use Supabase as your storage provider for media uploads in Strapi.

## Configuration

The provider configuration accepts the following options:

- `apiUrl`: The URL of your Supabase project.
- `apiKey`: The API key of your Supabase project.
- `bucket`: The name of the bucket where you want to store your media.

[//]: # (- `directory`: The directory inside the bucket where you want to store your media. Optional.)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Acknowledgments

- [Strapi](https://strapi.io/)
- [Supabase](https://supabase.io/)

This package is developed by [Low-Skilled-Developers](https://github.com/Low-Skilled-Developers)
