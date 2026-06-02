import { Component, type ReactNode } from 'react'

interface Props { children: ReactNode }
interface State { error: Error | null }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ background: '#0a0a0a', color: '#fff', padding: '40px', fontFamily: 'monospace', minHeight: '100vh' }}>
          <h2 style={{ color: '#f97316' }}>Ошибка рендера</h2>
          <pre style={{ color: '#f87171', whiteSpace: 'pre-wrap', fontSize: '13px' }}>
            {this.state.error.message}
            {'\n\n'}
            {this.state.error.stack}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}
