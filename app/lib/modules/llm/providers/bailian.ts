import { BaseProvider } from '~/lib/modules/llm/base-provider';
import type { ModelInfo } from '~/lib/modules/llm/types';
import type { IProviderSetting } from '~/types/model';
import type { LanguageModelV1 } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

export default class BailianProvider extends BaseProvider {
  name = 'Bailian';
  getApiKeyLink = 'https://help.aliyun.com/zh/dashscope/developer-reference/activate-dashscope-and-create-an-api-key';

  config = {
    apiTokenKey: 'BAILIAN_API_KEY',
    baseUrl: 'https://coding-intl.dashscope.aliyuncs.com/v1',
  };

  staticModels: ModelInfo[] = [
    {
      name: 'qwen3.5-plus',
      label: 'qwen3.5-plus',
      provider: 'Bailian',
      maxTokenAllowed: 1000000,
      maxCompletionTokens: 65536,
    },
    {
      name: 'qwen3-max-2026-01-23',
      label: 'qwen3-max-2026-01-23',
      provider: 'Bailian',
      maxTokenAllowed: 262144,
      maxCompletionTokens: 65536,
    },
    {
      name: 'qwen3-coder-next',
      label: 'qwen3-coder-next',
      provider: 'Bailian',
      maxTokenAllowed: 262144,
      maxCompletionTokens: 65536,
    },
    {
      name: 'qwen3-coder-plus',
      label: 'qwen3-coder-plus',
      provider: 'Bailian',
      maxTokenAllowed: 1000000,
      maxCompletionTokens: 65536,
    },
    {
      name: 'MiniMax-M2.5',
      label: 'MiniMax-M2.5',
      provider: 'Bailian',
      maxTokenAllowed: 204800,
      maxCompletionTokens: 131072,
    },
    {
      name: 'glm-5',
      label: 'glm-5',
      provider: 'Bailian',
      maxTokenAllowed: 202752,
      maxCompletionTokens: 16384,
    },
    {
      name: 'glm-4.7',
      label: 'glm-4.7',
      provider: 'Bailian',
      maxTokenAllowed: 202752,
      maxCompletionTokens: 16384,
    },
    {
      name: 'kimi-k2.5',
      label: 'kimi-k2.5',
      provider: 'Bailian',
      maxTokenAllowed: 262144,
      maxCompletionTokens: 32768,
    },
  ];

  getModelInstance(options: {
    model: string;
    serverEnv: Env;
    apiKeys?: Record<string, string>;
    providerSettings?: Record<string, IProviderSetting>;
  }): LanguageModelV1 {
    const { model, serverEnv, apiKeys, providerSettings } = options;

    const { apiKey, baseUrl } = this.getProviderBaseUrlAndKey({
      apiKeys,
      providerSettings: providerSettings?.[this.name],
      serverEnv: serverEnv as any,
      defaultBaseUrlKey: '',
      defaultApiTokenKey: 'BAILIAN_API_KEY',
    });

    if (!apiKey) {
      throw new Error(`Missing API key for ${this.name} provider`);
    }

    const bailian = createOpenAI({
      apiKey,
      baseURL: baseUrl,
    });

    return bailian(model);
  }
}
