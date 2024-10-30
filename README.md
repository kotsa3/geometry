## Project Setup

1. Run `npm install` to install dependencies.
2. Start the development server with `npm run dev`.

## Notes and Recommendations:

1. In a production project, configure the MUI theme and provide it through a context.
2. Set up a router for navigating between views in a real-world project.
3. Consider creating a modules directory with subdirectories like webGL and manager to organize components better. The components folder should ideally contain only shared, generic components.
4. The project uses the latest React version, which currently isn't fully compatible with the latest Airbnb linting rules. For this reason, I've configured a more flexible linter setup.
5. The table is built with MUI components as specified, though the data-grid library offers a more powerful and flexible solution.
6. Form field validation is done with MUI's built-in approach as required, but I'd recommend using react-hook-form for more complex form handling.
7. Per requirements, useState was used extensively. However, in a production setting, using Context in some cases would help prevent prop drilling.
8. Type Definition: Unique interfaces or types are kept within the relevant component file. Common types are located in a shared _interfaces_ folder.