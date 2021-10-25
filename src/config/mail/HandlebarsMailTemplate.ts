import Handlebars from 'handlebars';

export interface ITemplateVariable {
  [key: string]: string | number;
}

export interface IParseMailTemplate {
  template: string;
  variables: ITemplateVariable;
}

export default class HandlebarsMailTemplate {
  public async parse({
    template,
    variables,
  }: IParseMailTemplate): Promise<string> {
    const parseTemplate = Handlebars.compile(template);

    return parseTemplate(variables);
  }
}
