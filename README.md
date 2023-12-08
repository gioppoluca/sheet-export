- ![](https://img.shields.io/badge/Foundry-v11-informational)
- ![Latest Release Download Count](https://img.shields.io/github/downloads/gioppoluca/sheet-export/latest/module.zip)
- ![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Fsheet-export&colorB=4aa94a)

# Sheet Export

This module is an evolution of the Arcanist's module PDF Export.

It aims to offer the ability to export in PDF all the sheets for PC, NPC, Spells, Items etc.

At the moment the module manages:


| Game System | Version  | Release | Sheets | Description                                                                                  |
| ------------- | ---------- | --------- | -------- | ---------------------------------------------------------------------------------------------- |
| dnd5e       | standard | 2.3.x   | PC     | The classical PC PDF from WotC for the PC for 2.3.x release                                  |
|             |          |         | NPC    | a custom PDF for NPC for 2.3.x release                                                       |
|             |          | latest  | PC     | The classical PC PDF from WotC for the PC for latest release                                 |
|             |          |         | NPC    | a custom PDF for NPC for latest release                                                      |
|             | custom   | latest  | -      | The folder dedicated to keep custom mapping from the user                                    |
|             | extended | 2.3.x   | PC     | A union of the classical WotC with extended pages for equipment and spells for 2.3.x release |
|             |          |         | NPC    | a custom PDF for NPC for 2.3.x release                                                       |
|             |          | latest  | PC     | A union of the classical WotC with extended pages for equipment and spells                   |
|             |          |         | NPC    | a custom PDF for NPC                                                                         |
|             | BR       | latest  | PC     | The Brazilian version of the classical PC PDF from WotC for the PC for latest release        |
| CoC7        | standard | latest  | PC     | The classical PC PDF for Call Of Cthulhu                                                     |
|             | custom   | latest  | -      | The folder dedicated to keep custom mapping from the user                                    |
| pfe2        | standard | latest  | PC     | The classical PC PDF for Pathfinder 2° Edition                                              |
|             | custom   | latest  | -      | The folder dedicated to keep custom mapping from the user                                    |

## Features

1. Allow to choose different mapping from the ones aviable for the game system
2. Allow to export images
3. Allow to override the default PDF with own both at export time or at config time
4. Allow to cusomize mapping in configuration
5. Error management that explain precisely which mapping field had problems
6. Generate mapping file from PDF form by uploading PDF
7. Allow to define own helper function
8. Allow to set/override custom fonts on PDF

## Documentation

### Export

As seen in the image below in the actor sheet there is an **Export to PDF** button in the toolbar

![Button](img/button.png)

By pressing it you can choose to either use the default PDF that comes with the module (by pressing **Apply**) or to upload your own PDF (by choosing the button **Override mapping's PDF**).

![Export to PDF](img/export.png)

Applying the data to the PDF could require some time so wait untill it is finished and presents the following content:

![Alt text](img/export-applyed.png)

By pressing the round printer button the PDF is generated and downloaded to your computer.

### Settings

The settings form presents the drop down list for choosing the mapping for the game system of the world for your game; after saving a refresh will be asked.

![Settings](img/settings.png)

The **Edit internal mapping** button opens a dialog to see the content of the mapping file; you will be able to change the scripting of the mapping but beware since this could break the mapping, the advice is to download the mapping file from the module and to customize it by using the custom mapping option.

![edit mapping](img/edit-mapping.png)

The button **Generate mapping from PDF** allows you to generate the mapping file from the PDF file you will upload: you will get a json file with all PDF fields listed and all the mapping empty for you to complete.

The button **Set custom mapping** in the settings form allows you to upload yours json and PDF files.

![custom mapping](img/custom-mapping.png)

## Changelog
[Changelog](CHANGELOG.md)

## Support
Please open issues on this repo for any problems that you can have using this module.

If you want to support this work 
<a href="https://www.buymeacoffee.com/lucagioppo" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>