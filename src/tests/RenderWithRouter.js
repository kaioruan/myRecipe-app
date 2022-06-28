import { render } from '@testing-library/react';
import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

function RenderWithRouter(component) {
  const customHistory = createMemoryHistory();

  const returnFromRender = render(
    <Router history={ customHistory }>
      {component}
    </Router>,
  );

  return { history: customHistory, ...returnFromRender };
}

export default RenderWithRouter;
