import { inject, Injectable, WritableSignal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

import { SimpleTableData } from 'src/components/simple-table/simple-table.component';
import { TextAnalysisLink } from 'src/SilverLinks/Analysis/TextAnalysisLink';
import { WordFrequencyLink } from 'src/SilverLinks/Analysis/WordFrequencyLink';
import { AlternateCaseLink } from 'src/SilverLinks/Cases/AlternateCaseLink';
import { SwapCaseLink } from 'src/SilverLinks/Cases/SwapCaseLink';
import { ToCamelCaseLink } from 'src/SilverLinks/Cases/ToCamelCaseLink';
import { ToKebabCaseLink } from 'src/SilverLinks/Cases/ToKebabCaseLink';
import { ToLowerCaseLink } from 'src/SilverLinks/Cases/ToLowerCaseLink';
import { ToSentenceCaseLink } from 'src/SilverLinks/Cases/ToSentenceCaseLink';
import { ToSnakeCaseLink } from 'src/SilverLinks/Cases/ToSnakeCaseLink';
import { ToTitleCaseLink } from 'src/SilverLinks/Cases/ToTitleCaseLink';
import { ToUpperCaseLink } from 'src/SilverLinks/Cases/ToUpperCaseLink';
import { FromBase64Link, ToBase64Link } from 'src/SilverLinks/Cypher/Base64EncodeLink';
import { FromLeetLink, ToLeetLink } from 'src/SilverLinks/Cypher/LeetCypher';
import { FromMorseLink, ToMorseLink } from 'src/SilverLinks/Cypher/MorseLink';
import { FromNatoPhoneticLink, ToNatoPhoneticLink } from 'src/SilverLinks/Cypher/NatoPhonetic';
import { ToMd5HashLink } from 'src/SilverLinks/Cypher/ToMd5HashLink';
import { ToRot13Link } from 'src/SilverLinks/Cypher/ToRot13Link';
import { ToSha256HashLink } from 'src/SilverLinks/Cypher/ToShaHashLink';
import { FromUrlEscapeLink, ToUrlEscapeLink } from 'src/SilverLinks/Cypher/UrlEscapeLink';
import { ExtractDatesLink } from 'src/SilverLinks/Extraction/ExtractDatesLink';
import { ExtractEmailsLink } from 'src/SilverLinks/Extraction/ExtractEmailsLink';
import { ExtractNumbersLink } from 'src/SilverLinks/Extraction/ExtractNumbersLink';
import { UniqueLinesLink } from 'src/SilverLinks/Extraction/UniqueLinesLink';
import { UniqueWordsLink } from 'src/SilverLinks/Extraction/UniqueWordsLink';
import { LorempIpsumLink } from 'src/SilverLinks/Generation/LoremIpsumLink';
import { RandomNumbersLink } from 'src/SilverLinks/Generation/RandomNumbersLin';
import { UUIDLink } from 'src/SilverLinks/Generation/UUIDLink';
import { AsHtmlLink } from 'src/SilverLinks/Parsing/ASHtmlLink';
import { AsJsonLink } from 'src/SilverLinks/Parsing/AsJsonLink';
import { AsMarkdownLink } from 'src/SilverLinks/Parsing/AsMarkdownLink';
import { RegexSearchLink } from 'src/SilverLinks/Search&Replace/RegexSearchLink';
import { RegexSearchReplaceLink } from 'src/SilverLinks/Search&Replace/RegexSearchReplaceLink';
import { SearchLink } from 'src/SilverLinks/Search&Replace/SearchLink';
import { SearchReplaceLink } from 'src/SilverLinks/Search&Replace/SearchReplaceLink';
import { AlphabetizeLinesLink } from 'src/SilverLinks/Sorting/AphabetizeLinesLink';
import { RandomizeLinesLink, RandomizeTextLink } from 'src/SilverLinks/Sorting/RandomizeTextLinks';
import { ReverseLinesLink, ReverseTextLink } from 'src/SilverLinks/Sorting/ReverseTextLinks';
import { JoinTextLink, SplitTextLink } from 'src/SilverLinks/Splitting&Joining/SplittingJoining';
import { AddLineNumbersLink, RemoveLineNumbersLink } from 'src/SilverLinks/Transformation/LineNumbersLink';
import { PadLineLink } from 'src/SilverLinks/Transformation/PadLineLink';
import { RemoveInterpunctionLink } from 'src/SilverLinks/Transformation/RemoveInterpunctionLink';
import { RemoveWhiteSpaceLink } from 'src/SilverLinks/Transformation/RemoveWhiteSpaceLink';
import { TrimTextLink } from 'src/SilverLinks/Transformation/TrimTextLink';

export type SilverLinkTextElement = {
  Text?: string;
  HideTextField?: boolean;
  Information?: string;
  Image?: string;
  HTML?: SafeHtml;
  Markdown?: string;
  Object?: any;
  Table?: SimpleTableData;
};

export class SilverLinkData {
  public DataFields: SilverLinkTextElement[];

  constructor(input: string | undefined = undefined) {
    if (input === undefined) {
      this.DataFields = [];
      return;
    } else {
      this.DataFields = [{ Text: input }];
    }
  }
}

export interface SilverLink {
  Name: string;
  Searchterms: string;
  Description: string;
  Category: string;
  Id: string;

  Error: WritableSignal<boolean>;
  Output: WritableSignal<SilverLinkData>;
  Disabled: WritableSignal<boolean>;

  HasSettings: boolean;
  ShowSettings: WritableSignal<boolean>;

  Settings?: any;
  SettingsForm?: FormlyFieldConfig[];
  SettingsFormOptions?: FormlyFormOptions;

  Run(Input: SilverLinkData): SilverLinkData;
  LoadSettings(Input: any): void;
  New(): SilverLink;
}

@Injectable({
  providedIn: 'root',
})
export class LinksService {
  public DomSanitizer = inject(DomSanitizer);

  public DevLinks: SilverLink[] = [];

  public Links: SilverLink[] = [
    //Analysis
    new TextAnalysisLink(),
    new WordFrequencyLink(),

    //Generation
    new LorempIpsumLink(),
    new UUIDLink(),
    new RandomNumbersLink(),

    //Search and Replace
    new SearchLink(this.DomSanitizer),
    new RegexSearchLink(this.DomSanitizer),
    new SearchReplaceLink(),
    new RegexSearchReplaceLink(),

    //Parsing
    new AsMarkdownLink(),
    new AsJsonLink(),
    new AsHtmlLink(),

    //Splitting & Joining
    new SplitTextLink(),
    new JoinTextLink(),

    //Extraction
    new ExtractNumbersLink(),
    new ExtractEmailsLink(),
    new ExtractDatesLink(),
    new UniqueLinesLink(),
    new UniqueWordsLink(),

    //Sorting
    new ReverseTextLink(),
    new ReverseLinesLink(),
    new RandomizeTextLink(),
    new RandomizeLinesLink(),
    new AlphabetizeLinesLink(),

    //Cypher
    new ToRot13Link(),
    new ToLeetLink(),
    new FromLeetLink(),
    new ToNatoPhoneticLink(),
    new FromNatoPhoneticLink(),
    new ToMorseLink(),
    new FromMorseLink(),

    new ToUrlEscapeLink(),
    new FromUrlEscapeLink(),
    new ToBase64Link(),
    new FromBase64Link(),

    new ToMd5HashLink(),
    new ToSha256HashLink(),

    //Transformation
    new PadLineLink(),
    new TrimTextLink(),
    new RemoveWhiteSpaceLink(),
    new RemoveInterpunctionLink(),
    new AddLineNumbersLink(),
    new RemoveLineNumbersLink(),

    //Cases
    new ToUpperCaseLink(),
    new ToLowerCaseLink(),
    new AlternateCaseLink(),
    new SwapCaseLink(),
    new ToSentenceCaseLink(),
    new ToTitleCaseLink(),
    new ToCamelCaseLink(),
    new ToSnakeCaseLink(),
    new ToKebabCaseLink(),
  ];

  constructor() {
    let lorem = new LorempIpsumLink();
    lorem.Settings.Static = true;

    // this.DevLinks = [lorem, new RandomizeLinesLink(), new ToLowerCaseLink()];
    this.DevLinks = [lorem, new ToMorseLink(), new FromMorseLink()];
  }
}
