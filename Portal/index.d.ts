import React from 'react';
export interface PortalProps extends React.ComponentPropsWithoutRef<'div'> {
    container?: HTMLElement | null;
}
declare const Portal: React.ForwardRefExoticComponent<PortalProps & React.RefAttributes<HTMLDivElement>>;
export default Portal;
