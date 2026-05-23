/*
 * React error boundary that wraps every R3F component depending on an external
 * asset (Canvas root, useGLTF, useTexture, Environment HDRI, audio Howls).
 *
 * If an asset 404s or throws during load, this catches it and renders the
 * children-less fallback instead of unmounting the entire React tree.
 *
 * Per Bug Audit Failure Modes #3, #4, #7 — asset loaders crash production when
 * their files are missing because dev tolerates the warning but prod has no
 * boundary to absorb the throw.
 */
'use client';

import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error) => void;
}

interface State {
  hasError: boolean;
}

export class WorldErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    // Surface to console — visible in dev, captured in Sentry/etc. in prod
    console.error('[WorldErrorBoundary] caught', error);
    this.props.onError?.(error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
