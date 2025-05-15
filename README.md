# PyCamp Spain

> Website for the PyCamp in Spain: https://pycamp.es

## Set up

1. Clone the repo: `git clone https://github.com/PyCampES/pycampes`
2. Run `yarn install`

## Development

`yarn start`

## Deployment

The deployment is managed by Read the Docs.
Once a pull request is opened, there will be a preview.
Finally, when the pull request is merged, it will be deployed automatically.

## Add a new edition entry
Extend the list in the file `/public/previous_editions.njk` with and entry, eg:
```html
    {
        "year": "2050",
        "main_photo_path": "./images/edition-2050/portada.jpg",
        "main_photo_url": "https://photos.google.com/share/path/to/pic"
        "venue_link": "https://SOMEWHERE.com"
        "dates": "1 al 4 de Mayo",
        "google_photos_link": "https://photos.app.goo.gl/path/to/almbug",
        "thumbnails": [
            "./images/edition-2050/working1.jpg",
            "./images/edition-2050/working2.jpg"
            "./images/edition-2050/working3.jpg",
            "./images/edition-2050/working4.jpg",
        ]
    },
```
