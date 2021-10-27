import React from 'react';
import EditableContainer from '../Editable/EditableContainer';
import imagePlantPipe from '../../images/plantPipe.jpg';
import imageSign from '../../images/sign.jpg';
import imageShip from '../../images/ship.jpg';
import style from './NewsPaper.css';

const defaultNewsPaperFontSize = 14;

function NewsPaper({ imagePlaceholder, scaleFactor, isOnBoard }) {
    return (
        <div
            style={
                scaleFactor
                    ? {
                        fontSize: `${
                            scaleFactor * defaultNewsPaperFontSize
                        }px`,
                    }
                    : {}
            }
            className={style.newspaper}
        >
            <div className={style.header}>
                <div className={style.headerTitle}>The Daily Planet</div>
                <div className={style.newspaperSubheader}>
                    <div className={style.divider} />
                    <div className={style.newspaperSubheaderContent}>
                        <span>Scranton, Pennsylvania</span>
                        <span>Wednesday March 25</span>
                        <span>7 Pages</span>
                    </div>
                    <div className={style.divider} />
                </div>
            </div>
            <div className={style.newspaperTitle}>
                {isOnBoard ? (
                    <EditableContainer
                        isOnBoard={isOnBoard}
                        placeholderText="World faces disastrous 2.7C temperature rise"
                    />
                ) : (
                    'World faces disastrous 2.7C temperature rise'
                )}
            </div>
            <div className={style.divider} />
            <div className={style.newspaperGrid}>
                <div>
                    <div className={style.newspaperHeader2}>Report says</div>
                    <h3 className={style.newspaperHeader1}>
                        Countries must strengthen climate ambitions
                    </h3>
                    <span className={style.newspaperAuthor}>
                        by William M. Buttlicker
                    </span>
                    <div className={style.newspaperAuthorTitle}>
                        Chief Editor
                    </div>
                    <p>
                        The world is squandering the opportunity to “build back
                        better” from the Covid-19 pandemic, and faces disastrous
                        temperature rises of at least 2.7C if countries fail to
                        strengthen their climate pledges, according to a report
                        from the UN.
                    </p>
                    <p>
                        Tuesday’s publication warns that countries’ current
                        pledges would reduce carbon by only about 7.5% by 2030,
                        far less than the 45% cut scientists say is needed to
                        limit global temperature rises to 1.5C, the aim of the
                        Cop26 summit that opens in Glasgow this Sunday.
                    </p>
                    <p>
                        António Guterres, the UN secretary-general, described
                        the findings as a “thundering wake up call” to world
                        leaders
                    </p>
                    <div className={`${style.checkImg} ${style.filtered}`}>
                        <img src={imageShip} alt="" />
                    </div>
                </div>
                <div>
                    <blockquote>
                        Guterres said: “The heat is on, and as the contents of
                        this report show, the leadership we need is off. Far
                        off. This report is another thundering wake-up call. How
                        many do we need?”
                    </blockquote>
                    <div
                        className={`${style.mainImage} ${style.filtered}  droppable`}
                    >
                        <img
                            className={
                                imagePlaceholder ? 'imagePlaceholder' : ''
                            }
                            src={imagePlantPipe}
                            alt=""
                        />
                    </div>
                    <div>
                        <author className={style.newspaperAuthor}>
                            by Chad Light
                        </author>
                        <div className={style.newspaperAuthorTitle}>
                            News Staff Writer
                        </div>
                    </div>
                    <div className={style.newspaperThreecolumn}>
                        <div>
                            <p>
                                Many of the net zero pledges were found to be
                                vague, and unless accompanied by stringent cuts
                                in emissions this decade would allow global
                                heating of a potentially catastrophic extent.
                                Inger Andersen, the executive director of the UN
                                Environment Programme (Unep), which produced the
                                report, said: “Climate change is no longer a
                                future problem. It is a now problem. To stand a
                                chance of limiting global warming to 1.5C, we
                                have eight years to almost halve greenhouse gas
                                emissions: eight years to make the plans, put in
                                place the policies, implement them and
                                ultimately deliver the cuts. The clock is
                                ticking loudly.”
                            </p>
                            <p>
                                Emissions fell by about 5.4% last year during
                                Covid lockdowns, the report found, but only
                                about a fifth of the spending on economic
                                recovery was geared to efforts that would cut
                                carbon.
                            </p>
                        </div>
                        <div>
                            <p>
                                This failure to “build back better” despite
                                promises by governments around the world cast
                                doubt on the world’s willingness to make the
                                economic shift necessary to tackle the climate
                                crisis, the UN said. In the run-up to Cop26,
                                countries were supposed to submit national plans
                                on emissions cuts – called nationally determined
                                contributions (NDCs) – for the next decade, a
                                requirement under the 2015 Paris climate
                                agreement.
                            </p>
                            <p>
                                But the Unep report found only half of countries
                                had submitted new NDCs, with big emitters
                                including China and India still to publish their
                                plans, and several other governments – including
                                Russia, Brazil, Australia and Mexico – had
                                presented weak plans that were no improvement on
                                their 2015 Paris pledges.
                            </p>
                            <p>
                                “There is an ambition gap between country
                                pledges and the cuts needed to limit temperature
                                rise … and even more troubling is an
                                implementation gap
                            </p>
                        </div>
                        <div>
                            <p>
                                Longer-term net zero pledges for mid-century
                                have now been adopted by 49 countries and the
                                EU, putting about half of global emissions, half
                                of GDCP and about a third of the global
                                population under net zero pledges, according to
                                the report, which took into account pledges made
                                before the end of September.
                            </p>
                            <p>
                                But Andersen said net zero promises from
                                governments were often vague or ambiguous. If
                                these could be “made robust and implemented
                                fully”, the world could shave 0.5C off the
                                projected warming of 2.7C that Unep predicted,
                                she said.
                            </p>
                            <div
                                className={`${style.checkImg} ${style.filtered}`}
                            >
                                <img src={imageSign} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p>
                        Joeri Rogelj, the director of research at the Grantham
                        Institute, Imperial College London, said: “If
                        implemented, current net zero targets would lower
                        temperature projections for the next century by about
                        half a degree – bringing central estimates close to 2C –
                        yet still not in line with holding global warming well
                        below 2C, let alone 1.5C.
                    </p>
                    <p>
                        “On the other hand, the report also highlights that in
                        many cases countries’ near-term targets are not yet
                        putting emissions a clear track towards achieving their
                        net zero goals. This casts doubt on whether these
                        targets will ever be achieved.”
                    </p>
                    <p>
                        Ed Miliband, the shadow business secretary, said: “It’s
                        time for the government to start telling the truth about
                        how far away we are from where we need to be in this
                        decisive decade. This report makes clear there can be no
                        shifting of the goalposts from action this decade to
                        targets in the middle of this century. If we follow this
                        course, we will fail to keep global warming to 1.5C and
                        betray future generations.
                    </p>
                    <p>
                        “The window for action is closing, and it is critical
                        that in the budget and the days ahead, the prime
                        minister and the government step up to make Cop26 the
                        summit of climate delivery, not climate delay.”
                    </p>
                    <p>
                        In a panic, Scott released an apology video that was
                        posted online. In it, Scott states that "it wasn't me
                        (referencing who put the watermark on the paper). They
                        are trying to make me an escape goat."The emissions gap
                        report also highlighted methane, a powerful greenhouse
                        gas that arises from animal husbandry, natural gas
                        extraction and waste. The US, the EU and more than 20
                        other countries have signed a pledge to reduce methane
                        globally by 30% this decade.
                    </p>
                </div>
            </div>
            <div className={style.divider} />
        </div>
    );
}

export default NewsPaper;
