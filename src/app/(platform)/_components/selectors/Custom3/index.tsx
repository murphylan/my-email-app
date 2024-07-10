import { Element, useNode, UserComponent } from '@craftjs/core';
import React, { useEffect, useRef } from 'react';

import { Button } from '../Button';
import { Container } from '../Container';

export const Custom3BtnDrop = ({ children }: any) => {
  const {
    connectors: { connect },
  } = useNode();

  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (divRef.current) {
      connect(divRef.current);
    }
  }, [connect]);

  return (
    <div ref={divRef} className="w-full h-full">
      {children}
    </div>
  );
};

Custom3BtnDrop.craft = {
  rules: {
    canMoveOut: (outgoingNodes: any, self: any, helpers: any) => {
      const {
        data: { nodes },
      } = self;
      const btnNodes = nodes.filter(
        (id: any) => helpers(id).get().data.type === Button
      );

      const outgoingButtonNodes = outgoingNodes.filter(
        (node: { data: { type: UserComponent<{ background?: Record<"r" | "g" | "b" | "a", number>; color?: Record<"r" | "g" | "b" | "a", number>; buttonStyle?: string; margin?: any[]; text?: string; textComponent?: any; }>; }; }) => node.data.type === Button
      );

      if (outgoingButtonNodes.length < btnNodes.length) {
        return true;
      }

      return false;
    },
  },
};
export const Custom3 = (props: any) => {
  return (
    <Container {...props} className="overflow-hidden">
      <div className="w-full mb-4">
        <h2 className="text-center text-xs text-white">
          I must have at least 1 button
        </h2>
      </div>
      <Element canvas is={Custom3BtnDrop} id="wow">
        <Button background={{ r: 184, g: 247, b: 247, a: 1 }} />
      </Element>
    </Container>
  );
};

Custom3.craft = {
  ...Container.craft,
  displayName: 'Custom 3',
};
