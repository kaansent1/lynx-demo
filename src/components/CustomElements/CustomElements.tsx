import { Component, VNode } from 'lynx';

// Custom Input Component
interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  className?: string;
  onChange?: (e: Event) => void;
  onInput?: (e: Event) => void;
}

export class Input extends Component<InputProps> {
  render(): VNode {
    const { type = 'text', placeholder, value, className, onChange, onInput } = this.props;
    
    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        class={className}
        onChange={onChange}
        onInput={onInput}
      />
    );
  }
}

// Custom Select Component
interface SelectProps {
  value?: string;
  className?: string;
  onChange?: (e: Event) => void;
  children?: VNode[];
}

export class Select extends Component<SelectProps> {
  render(): VNode {
    const { value, className, onChange, children } = this.props;
    
    return (
      <select
        value={value}
        class={className}
        onChange={onChange}
      >
        {children}
      </select>
    );
  }
}

// Custom Option Component
interface OptionProps {
  value?: string;
  selected?: boolean;
  children?: string | VNode;
}

export class Option extends Component<OptionProps> {
  render(): VNode {
    const { value, selected, children } = this.props;
    
    return (
      <option
        value={value}
        selected={selected}
      >
        {children}
      </option>
    );
  }
}

// Alternative: Einfachere Wrapper-Funktionen (falls Components zu komplex sind)
export const createInput = (props: InputProps): VNode => {
  const { type = 'text', placeholder, value, className, onChange, onInput } = props;
  
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      class={className}
      onChange={onChange}
      onInput={onInput}
    />
  );
};

export const createSelect = (props: SelectProps): VNode => {
  const { value, className, onChange, children } = props;
  
  return (
    <select
      value={value}
      class={className}
      onChange={onChange}
    >
      {children}
    </select>
  );
};

export const createOption = (props: OptionProps): VNode => {
  const { value, selected, children } = props;
  
  return (
    <option
      value={value}
      selected={selected}
    >
      {children}
    </option>
  );
};