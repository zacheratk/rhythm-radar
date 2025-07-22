# Web Development Project 6 - *Rhythm Radar*

Submitted by: **Zachariah M. Herrera Atkins**

This web app: **View the top trending tracks, and find new ones!**

Time spent: **19.5** (4.5 on part 2) hours spent in total

The following **required** functionality is completed:

## Required Features

- [x] **Clicking on an item in the list view displays more details about it**
  - Clicking on an item in the dashboard list navigates to a detail view for that item
  - Detail view includes extra information about the item not included in the dashboard view
  - The same sidebar is displayed in detail view as in dashboard view
  - *To ensure an accurate grade, your sidebar **must** be viewable when showing the details view in your recording.*
- [x] **Each detail view of an item has a direct, unique URL link to that item’s detail view page**
  -  *To ensure an accurate grade, the URL/address bar of your web browser **must** be viewable in your recording.*
- [x] **The app includes at least two unique charts developed using the fetched data that tell an interesting story**
  - At least two charts should be incorporated into the dashboard view of the site
  - Each chart should describe a different aspect of the dataset


The following **optional** features are implemented:

- [ ] The site’s customized dashboard contains more content that explains what is interesting about the data 
  - e.g., an additional description, graph annotation, suggestion for which filters to use, or an additional page that explains more about the data
- [ ] The site allows users to toggle between different data visualizations
  - User should be able to use some mechanism to toggle between displaying and hiding visualizations 

  
The following **additional** features are implemented:

* [ ] List anything else that you added to improve the site's functionality!

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='./public/demo.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with [Kap](https://getkap.co/) for macOS

## Notes

The hardest part about developing this app was setting up authentication in order to use the Spotify API. The Spotify API requires OAuth in order for users to use the API. After spending time reading the API documentation and researching the best flow for my use case, I settled on a authentication with PKCE flow.

Another challenge was that some of the API features that I originally wanted to use are now deprecated, so I had to work around those issues. One example is that the api no longer allows you to pull tracks from playlists that are "algorithmically generated", so I compromised by using the Billboard Hot 100 songs playlist, which is updated weekly.

## License

    Copyright 2025 Zachariah M. Herrera Atkins

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.