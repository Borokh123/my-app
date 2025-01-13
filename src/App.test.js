import { render, screen } from '@testing-library/react';
import SamuraiJSApp from './App';
import {createRoot} from "react-dom/client";

it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(<SamuraiJSApp/>);
    root.unmount();
});


// test('renders learn react link', () => {
//    render(<SamuraiJSApp />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
