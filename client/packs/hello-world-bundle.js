import ReactOnRails from 'react-on-rails';

import InvoicesIndex from '../bundles/invoices/components/InvoicesIndex';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  InvoicesIndex,
});
