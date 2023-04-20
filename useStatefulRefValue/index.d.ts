import React from 'react';
declare function useStatefulRefValue<V>(ref: React.RefObject<V>, initialValue: V): [V, (refValue: V) => void];
export { useStatefulRefValue };
