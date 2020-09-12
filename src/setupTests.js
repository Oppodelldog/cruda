// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';


/*
 workaround for error in tests:
 TypeError: MutationObserver is not a constructor

 Suggested in Option 3 of Release 7.
 https://github.com/testing-library/dom-testing-library/releases/tag/v7.0.0

 Might be removed when react-scripts depend on jest>=25
 */
import MutationObserver from '@sheerun/mutationobserver-shim'
window.MutationObserver = MutationObserver
